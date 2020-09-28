```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2019 Intel Corporation
```
<!-- omit in toc -->
# Dataplane support for Edge Cloud between ENB and EPC (S1-U) Deployment
- [Overview](#overview)
- [Network Traffic Services](#network-traffic-services)

## Overview 

The ETSI MEC specification outlines that the Edge Cloud can be deployed between the 4G base station (eNb) and Evolved Packet Core (EPC). Such deployments are used in private LTE deployments. This deployment was specifically created to address the needs of Private LTE and some low-latency use cases. OpenNESS supports this deployment in the On-Premises version. Typically, data between eNb and EPC is called S1. S1-U is a user plane that has GTP-U traffic and is usually encrypted. Since private LTE controls the network, Private LTE operators can turn off encryption. 

## Network Traffic Services  

OpenNESS assumes that S1-U traffic is unencrypted. The control plane S1 traffic is S1-MME and is over the SCTP protocol. OpenNESS does not process or handle Control Plane S1-MME Traffic in this deployment. From an EPC perspective, the Edge Cloud platform acts as an intermediary. The following diagram shows the support of such a deployment.

![S1 deployment of Edge cloud](nts-images/nts1.png)

_Figure - OpenNESS Architecture_

The Network Transport Service (NTS) is a Dataplane component that provides a network traffic control service and a data forwarding service to mobile edge applications, specifically for S1-U deployments. NTS is helped by an an IO thread. Both IO and NTS are poll mode threads implemented using DPDK. The following criteria should be considered by a user before using NTS as a Dataplane:
1. NTS as a Dataplane is only intended for a S1-U Deployment, which is typically used in Private LTE-based edge cloud deployments. 
2. NTS supports the processing of IP only traffic but is limited and does not implement ARP or gateway functionality. 
3. NTS supports basic fragmentation and reassembly to help the deployment of legacy IP cameras.  
4. It is assumed that the private LTE operator has complete control of the UE, eNb, and EPC. This is because NTS uses a learning mechanism to understand the upstream and downstream traffic. 

NTS Dataplane has the following features and behavior: 
- Runs on every Edge Node. It is implemented in the C language using DPDK for high-performance IO. 
- This is the recommended Dataplane when incoming and outgoing flows are a mix of pure IP + S1-U (GTPu). 
- Provides a reference ACL-based, application-specific packet tuple filtering 
- Provides a reference GTPu base packet learning for S1 deployments 
- Provides a reference Simultaneous IP and S1 deployment 
- Provides a reference API for REST/grpc to C API 
- Future enhancement of UE-based traffic steering for authentication
- Reference implementation which does not depend on EPC implementation 
- Reference Packet forwarding decision independent of IO
- Implements KNI-based interface to Edge applications running as Containers/POD 
- Implements DPDK vHost user-based interface to Edge applications running as a Virtual Machine 
- Implements Scatter and Gather in upstream and downstream 
- Dedicated interface created for Dataplane based on vhost-user for VM, dpdk-kni for Containers
- A Container or VM default Interface can be used for Inter-App, management and Internet access from an application 
- Dedicated OVS-DPDK interface for inter-apps communication can be created in the case of On-Premises deployment. 
- When the NTS receives traffic from the UE and there is no application on the Edge cloud, that traffic is sent to the EPC (hence, intermediary deployment). 

The Data Plane traffic routing with NTS is based on the following sequence: I/O → NTS → I/O

The NTS thread continuously visits its ingress rings and calls the following methods in the specific order:

* dequeue() - method to dequeue the packet descriptors found on the current ring
* edit() - to classify the dequeued packet
* enqueue() - based on the classification results NTS enqueues the packet to an appropriate egress ring

The edit() method is unique for every ingress ring. There are different implementations of this method:

* one for each combination of traffic type (IP, GTPu) and traffic direction (upstream, downstream) for ingress physical ports
* one for Local Breakout Port (LBP) and VM/App ingress ports


>**NOTE**: LBP port is a physical port, which carries similar data to VM/App ports.


![NTS Dataplane flow processing](nts-images/nts2.png)

_Figure - NTS Dataplane flow processing_

NTS also supports the identification of a DNS request packet type from the UE and it forwards it to the DNS agent running on the edge node.

