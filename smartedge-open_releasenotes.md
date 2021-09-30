```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2019-2021 Intel Corporation
```
<!-- omit in toc -->
# Release Notes 
This document provides high-level system features, issues, and limitations information for Open Network Edge Services Software (Smart Edge Open). 
- [Release history](#release-history)
  - [Smart Edge Open - 19.06](#smart-edge-open---1906)
  - [Smart Edge Open - 19.09](#smart-edge-open---1909)
  - [Smart Edge Open - 19.12](#smart-edge-open---1912)
  - [Smart Edge Open - 20.03](#smart-edge-open---2003)
  - [Smart Edge Open - 20.06](#smart-edge-open---2006)
  - [Smart Edge Open - 20.09](#smart-edge-open---2009)
  - [Smart Edge Open - 20.12](#smart-edge-open---2012)
  - [Smart Edge Open - 21.03](#smart-edge-open---2103)
  - [Smart Edge Open - 21.03.01](#smart-edge-open---210301)
  - [Smart Edge Open - 21.03.02](#smart-edge-open---210302)
  - [Smart Edge Open - 21.03.03](#smart-edge-open---210303)
  - [Smart Edge Open - 21.09](#smart-edge-open---2109)
- [Changes to Existing Features](#changes-to-existing-features)
  - [Smart Edge Open - 19.06](#smart-edge-open---1906-1)
  - [Smart Edge Open - 19.06.01](#smart-edge-open---190601)
  - [Smart Edge Open - 19.09](#smart-edge-open---1909-1)
  - [Smart Edge Open - 19.12](#smart-edge-open---1912-1)
  - [Smart Edge Open - 20.03](#smart-edge-open---2003-1)
  - [Smart Edge Open - 20.06](#smart-edge-open---2006-1)
  - [Smart Edge Open - 20.09](#smart-edge-open---2009-1)
  - [Smart Edge Open - 20.12](#smart-edge-open---2012-1)
  - [Smart Edge Open - 21.03](#smart-edge-open---2103-1)
  - [Smart Edge Open - 21.09](#smart-edge-open---2109-1)
- [Fixed Issues](#fixed-issues)
  - [Smart Edge Open - 19.06](#smart-edge-open---1906-2)
  - [Smart Edge Open - 19.06.01](#smart-edge-open---190601-1)
  - [Smart Edge Open - 19.06.01](#smart-edge-open---190601-2)
  - [Smart Edge Open - 19.12](#smart-edge-open---1912-2)
  - [Smart Edge Open - 20.03](#smart-edge-open---2003-2)
  - [Smart Edge Open - 20.06](#smart-edge-open---2006-2)
  - [Smart Edge Open - 20.09](#smart-edge-open---2009-2)
  - [Smart Edge Open - 20.12](#smart-edge-open---2012-2)
  - [Smart Edge Open - 20.12.02](#smart-edge-open---201202)
  - [Smart Edge Open - 21.03](#smart-edge-open---2103-2)
  - [Smart Edge Open - 21.03.01](#smart-edge-open---210301-1)
  - [Smart Edge Open - 21.03.02](#smart-edge-open---210302-1)
  - [Smart Edge Open - 21.03.03](#smart-edge-open---210303-1)
  - [Smart Edge Open - 21.09](#smart-edge-open---2109-2)
- [Known Issues and Limitations](#known-issues-and-limitations)
  - [Smart Edge Open - 19.06](#smart-edge-open---1906-3)
  - [Smart Edge Open - 19.06.01](#smart-edge-open---190601-3)
  - [Smart Edge Open - 19.09](#smart-edge-open---1909-2)
  - [Smart Edge Open - 19.12](#smart-edge-open---1912-3)
  - [Smart Edge Open - 20.03](#smart-edge-open---2003-3)
  - [Smart Edge Open - 20.06](#smart-edge-open---2006-3)
  - [Smart Edge Open - 20.09](#smart-edge-open---2009-3)
  - [Smart Edge Open - 20.12](#smart-edge-open---2012-3)
  - [Smart Edge Open - 20.12.02](#smart-edge-open---201202-1)
  - [Smart Edge Open - 21.03](#smart-edge-open---2103-3)
  - [Smart Edge Open - 21.03.02](#smart-edge-open---210302-2)
  - [Smart Edge Open - 21.09](#smart-edge-open---2109-3)
- [Release Content](#release-content)
  - [Smart Edge Open - 19.06](#smart-edge-open---1906-4)
  - [Smart Edge Open - 19.06.01](#smart-edge-open---190601-4)
  - [Smart Edge Open - 19.09](#smart-edge-open---1909-3)
  - [Smart Edge Open - 19.12](#smart-edge-open---1912-4)
  - [Smart Edge Open - 20.03](#smart-edge-open---2003-4)
  - [Smart Edge Open - 20.06](#smart-edge-open---2006-4)
  - [Smart Edge Open - 20.09](#smart-edge-open---2009-4)
  - [Smart Edge Open - 20.12](#smart-edge-open---2012-4)
  - [Smart Edge Open - 20.12.02](#smart-edge-open---201202-2)
  - [Smart Edge Open - 21.03](#smart-edge-open---2103-4)
- [Hardware and Software Compatibility](#hardware-and-software-compatibility)
  - [Intel® Xeon® D Processor](#intel-xeon-d-processor)
  - [3rd Generation Intel® Xeon® Scalable Processors - Early Access](#3rd-generation-intel-xeon-scalable-processors---early-access)
  - [2nd Generation Intel® Xeon® Scalable Processors](#2nd-generation-intel-xeon-scalable-processors)
  - [Intel® Xeon® Scalable Processors](#intel-xeon-scalable-processors)
- [Supported Operating Systems](#supported-operating-systems)
- [Packages Version](#packages-version)
- [Disclaimer](#disclaimer)

# Release history

## Smart Edge Open - 19.06
- Edge Cloud Deployment options
  - Controller-based deployment of Applications in Docker Containers/VM–using-Libvirt
  - Controller + Kubernetes\* based deployment of Applications in Docker\* Containers
- Smart Edge Open Controller
  - Support for Edge Node Orchestration
  - Support for Web UI front end
- Smart Edge Open APIs
  - Edge Application APIs
  - Edge Virtualization Infrastructure APIs
  - Edge Application life cycle APIs
  - Core Network Configuration APIs
  - Edge Application authentication APIs
  - Smart Edge Open Controller APIs
- Platform Features
  - Microservices based Appliance and Controller agent deployment
  - Support for DNS for the edge
  - CentOS\* 7.6 / CentOS 7.6 + RT kernel
  - Basic telemetry support
- Sample Reference Applications
  - OpenVINO™  based Consumer Application 
  - Producer Application supporting OpenVINO™
- Dataplane
  - DPDK/KNI based Dataplane – NTS
  - Support for deployment on IP, LTE (S1, SGi and LTE CUPS)
- Cloud Adapters
  - Support for running Amazon\* Greengrass\* cores as an Smart Edge Open application
  - Support for running Baidu\* Cloud as an Smart Edge Open application
- Documentation
  - User Guide Enterprise and Operator Edge
  - Smart Edge Open Architecture
  - Swagger/Proto buff  External API Guide
  - 4G/CUPS API whitepaper
  - Cloud Connector App note
  - OpenVINO™ on Smart Edge Open App note

## Smart Edge Open - 19.09
- Edge Cloud Deployment options
  - Async method for image download to avoid timeout. 
- Dataplane
  - Support for OVN/OVS based Dataplane and network overlay for Network Edge (based on Kubernetes)
- Cloud Adapters
  - Support for running Amazon Green grass cores as an Smart Edge Open application with OVN/OVS as Dataplane and network overlay
- Support for Inter-App comms
  - Support for OVS-DPDK or Linux\* bridge or Default interface for inter-Apps communication for OnPrem deployment
- Accelerator support
  - Support for HDDL-R accelerator for interference in a container environment for OnPrem deployment
- Edge Applications
  - Early Access Support for Open Visual Cloud (OVC) based Smart City App on Smart Edge Open OnPrem
  - Support for Dynamic use of VPU or CPU for Inferences
- Gateway
  - Support for Edge node and Smart Edge Open Controller gate way to support route-ability
- Documentation
  - Smart Edge Open Architecture (update)
  - Smart Edge Open Support for OVS as dataplane with OVN
  - Open Visual Cloud Smart City Application on Smart Edge Open - Solution Overview
  - Using Intel® Movidius™ Myriad™ X High Density Deep Learning (HDDL) solution in Smart Edge Open
  - Smart Edge Open How-to Guide (update)

## Smart Edge Open - 19.12
- Hardware
  - Support for Cascade lake 6252N
  - Support for Intel® FPGA Programmable Acceleration Card (Intel® FPGA PAC) N3000
- Edge Application
  - Fully cloud native Open Visual Cloud Smart City Application pipeline on Smart Edge Open Network edge.
- Edge cloud
  - EAA and CNCA microservice as native Kubernetes-managed services
  - Support for Kubernetes version 1.16.2
- Edge Compute EPA features support for Network Edge
  - CPU Manager: Support deployment of POD with dedicated pinning
  - SRIOV NIC: Support deployment of POD with dedicated SRIOV VF from NIC
  - SRIOV FPGA: Support deployment of POD with dedicated SRIOV VF from FPGA
  - Topology Manager: Support k8s to manage the resources allocated to workloads in a NUMA topology-aware manner
  - BIOS/FW Configuration service - Intel SysCfg based BIOS/FW management service
  - Hugepages: Support for allocation of 1G/2M huge pages to the Pod
  - Multus: Support for Multiple network interface in the PODs deployed by Kubernetes
  - Node Feature discovery: Support detection of Silicon and Software features and automation of deployment of CNF and Applications
  - FPGA Remote System Update service: Support the Open Programmable Acceleration Engine (OPAE) (fpgautil) based image update service for FPGA
  - Non-Privileged Container: Support deployment of non-privileged pods (CNFs and Applications as reference)
- Edge Compute EPA features support for On-Premises
  - Using Intel® Movidius™ Myriad™ X High Density Deep Learning (HDDL) solution in Smart Edge Open
- Converged Edge Experience Kits for Network and OnPremises edge
  - Offline Release Package: Customers should be able to create an installer package that can be used to install OnPremises version of Smart Edge Open without the need for Internet access.
- 5G NR Edge Cloud deployment support
  - 5G NR edge cloud deployment support with SA mode
  - AF: Support for 5G NGC Application function as a microservice
  - NEF: Support for 5G NGC Network Exposure function as a microservice
  - Support for 5G NR UDM, UPF, AMF, PCF and SCF (not part of the release)
- DNS support
  - DNS support for UE
  - DNS Support for Edge applications
- Documentation
  - Completely reorganized documentation structure for ease of navigation
  - 5G NR Edge Cloud deployment Whitepaper
  - EPA application note for each of the features

## Smart Edge Open - 20.03
- OVN/OVS-DPDK support for dataplane
  - Network Edge: Support for kube-ovn CNI with OVS or OVS-DPDK as dataplane. Support for Calico as CNI.
  - OnPremises Edge: Support for OVS-DPDK CNI with OVS-DPDK as dataplane supporting application deployed in containers or VMs
- Support for VM deployments on Kubernetes mode
  -  Kubevirt based VM deployment support
  -  EPA Support for SRIOV Virtual function allocation to the VMs deployed using Kubernetes
- EPA support - OnPremises 
  - Support for dedicated core allocation to applications running as VMs or Containers
  - Support for dedicated SRIOV VF allocation to applications running in VM or containers
  - Support for system resource allocation into the application running as a container
     - Mount point for shared storage
     - Pass environment variables
     - Configure the port rules  
- Core Network Feature (5G)
  - PFD Management API support (3GPP 23.502  Sec. 52.6.3 PFD Management service)
    - AF: Added support for PFD Northbound API
    - NEF: Added support for PFD southbound API, and Stubs to loopback the PCF calls.
  - kubectl: Enhanced CNCA kubectl plugin to configure PFD parameters
  - WEB UI: Enhanced CNCA WEB UI to configure PFD params in OnPerm mode
  - Auth2 based authentication between 5G Network functions: (as per 3GPP Standard)
    - Implemented oAuth2 based authentication and validation
    - AF and NEF communication channel is updated to authenticated based on oAuth2 JWT token in addition to HTTP2. 
  - HTTPS support
    - Enhanced the 5G OAM, CNCA (web-ui and kube-ctl) to HTTPS interface
- Modular Playbook
  - Support for customers to choose real-time or non-realtime kernel for an edge node
  - Support for customers to choose CNIs - Validated with Kube-OVN and Calico 
- Edge Apps
  - FlexRAN: Dockerfile and pod specification for the deployment of 4G or 5G FlexRAN
  - AF: Dockerfile and pod specification
  - NEF: Dockerfile and pod specification
  - UPF: Dockerfile and pod specification

## Smart Edge Open - 20.06
- Smart Edge Open is now available in two distributions
  - Open source (Apache 2.0 license)
  - Intel Distribution of Smart Edge Open (Intel Proprietary License)
    - Includes all the code from the open source distribution plus additional features and enhancements to improve the user experience
    - Access requires a signed license. A request for access can be made at openness.org by navigating to the "Products" section and selecting "Intel Distribution of Smart Edge Open"
  - Both distributions are hosted at github.com/smart-edge-open
- On premises configuration now optionally supports Kubernetes
- Core Network Feature (5G)
  - Policy Authorization Service support in AF and CNCA over the N5 Interface(3GPP 29.514 - Chapter 5 Npcf_PolicyAuthorization Service API).
  - Core Network Notifications for User Plane Path Change event received through Policy Authorization support in AF.
  - NEF South Bound Interfaces support to communicate with the Core Network Functions for Traffic Influence and PFD.
  - Core Network Test Function (CNTF) microservice added for validating the AF & NEF South Bound Interface communication. 
  - Flavors added for Core Network control-plane and user-plane.
  - Smart Edge Open assisted Edge cloud deployment in 5G Non Standalone mode whitepaper.
  - Smart Edge Open 20.06 5G features enablement through the enhanced-Smart Edge Open release (IDO).
- Dataplane
  - Support for Calico eBPF as CNI
  - Performance baselining of the CNIs
- Visual Compute and Media Analytics
  - Intel Visual Cloud Accelerator Card - Analytics (VCAC-A) Kubernetes deployment support (CPU, GPU, and VPU)
  - Node feature discovery of VCAC-A
  - Telemetry support for VCAC-A
  - Provide ansible and Helm -playbook support for OVC codecs Intel® Xeon® CPU mode - video analytics service (REST API) for developers
- Edge Applications
  - Smart City Application Pipeline supporting CPU or VCAC-A mode with Helm chart
  - CDN Content Delivery using NGINX with SR-IOV capability for higher performance with Helm chart 
  - CDN transcode sample application using Intel® Xeon® CPU optimized media SDK with Helm chart
  - Support for Transcoding Service using Intel® Xeon® CPU optimized media SDK with Helm chart
  - Intel Edge Insights application support with Helm chart
- Edge Network Functions
  - FlexRAN DU with Helm Chart (FlexRAN not part of the release)
  - xRAN Fronthaul with Helm CHart (xRAN app not part of the release)
  - Core Network Function - Application Function with Helm chart
  - Core Network Function - Network Exposure Function With Helm chart
  - Core Network Function - UPF (UPF app not part of the release)
  - Core network Support functions - OAM and CNTF
- Helm Chart for Kubernetes enhancements
  - NFD, CMK, SRIOV-Device plugin and Multus\*
  - Support for local Docker registry setup
- Support for deployment-specific Flavors
  - Minimal
  - RAN - 4G and 5G
  - Core - User plane and Control Plane 
  - Media Analytics with VCAC-A and with CPU only mode
  - CDN - Transcode
  - CDN - Content Delivery
  - Azure - Deployment of Smart Edge Open cluster on Microsoft\* Azure\* cloud
- Support for Smart Edge Open on CSP Cloud 
  - Azure - Deployment of Smart Edge Open cluster on Microsoft\* Azure\* cloud
- Telemetry Support 
  - Support for Collectd backend with hardware from Intel and custom metrics
  - cpu, cpufreq, load, hugepages, intel_pmu, intel_rdt, ipmi, ovs_stats, ovs_pmd_stats
  - FPGA – PACN3000 (collectd) - Temp, Power draw
  - VPU Device memory, VPU device thermal, VPU Device utilization
  - Open Telemetry - Support for collector and exporter for metrics (e.g., heartbeat from app)
  - Support for PCM counter for Prometheus\* and Grafana\*
  - Telemetry Aware Scheduler
- Early Access support for Resource Management Daemon (RMD)
  - RMD for cache allocation to the application Pods
- Ability to deploy Smart Edge Open Master and Node on the same platform

## Smart Edge Open - 20.09
- Native On-premises mode
  - Following from the previous release decision of pausing Native on-premises Development the code has been move to a dedicated repository “native-on-prem”
  - Kubernetes based solution will now support both Network and on-premises Edge
- Service Mesh support
  - Basic support for Service Mesh using Istio Service Mesh within an Smart Edge Open cluster.
    > **NOTE**: When deploying Istio Service Mesh in VMs, a minimum of 8 CPU core and 16GB RAM must be allocated to each worker VM so that Istio operates smoothly
  - Application of Service Mesh openness 5G and Media analytics - A dedicated network for service to service communications
- EAA Update 
  - EAA microservices has been updated to be more cloud-native friendly
- 5G Core AF and NEF
  - User-Plane Path Change event notifications from AF received over N33 I/f [Traffic Influence updates from SMF received through NEF]
  - AF/NEF/OAM Configuration and Certificate updates through Configmaps.
  - AF and OAM API’s access authorization through Istio Gateway.
  - Envoy Sidecar Proxy for all the 5G microservices(AF/NEF/OAM/CNTF) which enables support for telemetry(Request/Response Statistics), certificates management, http 2.0 protocol configuration(with/without TLS)
  - Core-cplane flavor is enabled with Istio
- Edge Insights Application (update)
  - Industrial Edge Insights Software update to version 2.3.
  - Experience Kit now supports multiple detection video's – Safety equipment detection, PCB default detection and also supports external video streams. 
- Smart Edge Open Experience Kit Near Edge 
  - Core network and Application reference architecture
  - Smart Edge Open Experience Kit provides reference integration of Smart Edge Open, Network function 5G UPF (Not part of the release), OpenVINO with EIS application.  

## Smart Edge Open - 20.12
- Reference Converged Edge Reference Architecture (Smart Edge Open Experience Kit) On-Premises Edge and Private Wireless deployment focusing on On-Premises, Private Wireless and Ruggedized Outdoor deployments, presenting a scalable solution across the On-Premises edge.
- Reference deployment with Kubernetes enhancements for High performance compute and networking for an SD-WAN node (Edge) that runs Applications, Services, and SD-WAN CNF. AI/ML applications and services are targeted in this flavor with support for Hardware offload for inferencing.
- Reference deployment with Kubernetes enhancements for high-performance compute and networking for an SD-WAN node (Hub) that runs SD-WAN CNF.
- Reference deployment for high-performance Computing and Networking using SR-IOV for reference Untrusted Non-3GPP Access as defined by 3GPP Release 15.
- Reference implementation of the offline installation package for the Smart Edge Open Experience Kit Access Edge flavor enabling installation of Kubernetes and related enhancements for Access edge deployments.
- Early access release of Edge Multi-Cluster Orchestration(EMCO), a Geo-distributed application orchestrator for Kubernetes. This release supports EMCO deploying and managing the life cycle of the Smart City Application pipeline on the edge cluster. More details in the [EMCO Release Notes](https://github.com/smart-edge-open/EMCO/blob/main/ReleaseNotes.md).
- Azure Development kit (Devkit) supporting the installation of an Smart Edge Open Kubernetes cluster on the Microsoft* Azure* cloud. This is typically used by a customer who wants to develop applications and services for the edge using Smart Edge Open building blocks.
- Support Intel® vRAN Dedicated Accelerator ACC100, Kubernetes Cloud-native deployment supporting higher capacity 4G/LTE and 5G vRANs cells/carriers for FEC offload. 
- Major system Upgrades: Kubernetes 1.19.3, CentOS 7.8, Calico 3.16, and Kube-OVN 1.5.2.

## Smart Edge Open - 21.03
- EMCO: Hardware Platform Awareness (HPA) based Placement Intent support. Demonstrated using Smart City Pipeline with CPU and VCAC-A mode. 
- Edge Insights for Industrial updated to 2.4
- SD-WAN Flavor deployment automation improvement 
- Support for Intel® Ethernet Controller E810 
- Improvements to Converged Edge Reference Architecture framework including support for deploying one or more Smart Edge Open Kubernetes clusters 
- OpenVINO upgraded to  2021.1.110
- Early Access support for 3rd Generation Intel® Xeon® Scalable Processors
- Major system upgrades: CentOS 7.9, Kubernetes 1.20.0, Docker 20.10.2, QEMU 5.2 and Golang 1.16.
- Kubernetes CNI upgrades: Calico 3.17, SR-IOV CNI 2.6, Flannel 0.13.0.
- Telemetry upgrades: CAdvisor 0.37.5, Grafana 7.4.2, Prometheus 2.24.0, Prometheus Node Exporter 1.0.1.
- Set Calico as a default cni for cdn-transcode, central_orchestrator, core-cplane, core-uplane, media-analytics and minimal flavor.
- Intel CMK is replaced with Kubernetes native CPU manager for core resource allocation

## Smart Edge Open - 21.03.01
- Resolved an intermittent issue with Kubernetes repository signature verification

## Smart Edge Open - 21.03.02
- Kubernetes deployment support for Intel® QuickAssist Technology (Intel® QAT)
- Provided an option to use CGroupFS as a CGroup driver for Kubernetes and Docker
- EII upgraded from 2.4 to 2.4.1
- VCA package upgraded from R5 to R5.1

## Smart Edge Open - 21.03.03
- Changed the CNI used for Azure cloud deployment from default Calico to Azure-supported kube-ovn.

## Smart Edge Open - 21.09
5G On Premises Edge has been re-named to 5G Private Wireless Experience Kit with Integrated RAN
- Support for 3rd Gen Intel® Xeon® Scalable Processors (Ice lake)
- Support for Intel® vRAN Dedicated Accelerator ACC100
- Support for Intel® QuickAssist Adapter 8970
- Support for Intel® X710 DA-4FH Network Card
- CNFs support 
  - DU-L1	Verified FlexRAN BBU v20.11
  - DU-L2	Verified Radisys L2DU v2.2
  - CU-L2L3	Verified Radisys L2L3CU v2.2
  - UPF,AMF and SMF	Verified Radisys 5GC v2.2
- Sub6 4x4 RRH Foxconn Sub6 4x4 RRH 
  - RPQN-7800, 3.3-3.6GHz with firmware version: v1.0.3q 432
  
# Changes to Existing Features

## Smart Edge Open - 19.06
There are no unsupported or discontinued features relevant to this release.

## Smart Edge Open - 19.06.01
There are no unsupported or discontinued features relevant to this release.

## Smart Edge Open - 19.09
There are no unsupported or discontinued features relevant to this release.

## Smart Edge Open - 19.12
- NTS Dataplane support for Network edge is discontinued.
- Controller UI for Network edge has been discontinued except for the CNCA configuration. Customers can optionally leverage the Kubernetes dashboard to onboard applications. 
- Edge node only supports non-realtime kernel.

## Smart Edge Open - 20.03
- Support for HDDL-R only restricted to non-real-time or non-customized CentOS 7.6 default kernel. 

## Smart Edge Open - 20.06
- Offline install for Native mode OnPremises has be deprecated 

## Smart Edge Open - 20.09
- Native on-premises is now located in a dedicated repository with no further feature updates from previous release.

## Smart Edge Open - 20.12
There are no unsupported or discontinued features relevant to this release.

## Smart Edge Open - 21.03
- FlexRAN/Access Edge Smart Edge Open Experience Kit Flavor is only available in Intel Distribution of Smart Edge Open
- Smart Edge Open repositories have been consolidated to the following 
  - https://github.com/smart-edge-open/ido-converged-edge-experience-kits
  - https://github.com/smart-edge-open/ido-specs
  - https://github.com/smart-edge-open/ido-edgeservices
  - https://github.com/smart-edge-open/ido-epcforedge
- Smart Edge Open Experience Kit On Prem Edge and Private Wireless flavor removed

## Smart Edge Open - 21.09
5G On Premises Edge has been re-named to 5G Private Wireless Experience Kit with Integrated RAN
- Support for 3rd Gen Intel® Xeon® Scalable Processors (Ice lake)
- Support for Intel® vRAN Dedicated Accelerator ACC100
- Support for Intel® QuickAssist Adapter 8970
- Support for Intel® X710 DA-4FH Network Card
- CNFs support 
  - DU-L1	Verified FlexRAN BBU v20.11
  - DU-L2	Verified Radisys L2DU v2.2
  - CU-L2L3	Verified Radisys L2L3CU v2.2
  - UPF,AMF and SMF	Verified Radisys 5GC v2.2
- Sub6 4x4 RRH Foxconn Sub6 4x4 RRH 
  - RPQN-7800, 3.3-3.6GHz with firmware version: v1.0.3q 432
# Fixed Issues

## Smart Edge Open - 19.06
There are no non-Intel issues relevant to this release.

## Smart Edge Open - 19.06.01
There are no non-Intel issues relevant to this release.

## Smart Edge Open - 19.06.01
- VHOST HugePages dependency
- Bug in getting appId by IP address for the container
- Wrong value of appliance verification key printed by ansible script
- NTS is hanging when trying to add same traffic policy to multiple interfaces
- Application in VM cannot be started
- Bug in libvirt deployment
- Invalid status after app un-deployment
- Application memory field is in MB

## Smart Edge Open - 19.12
- Improved usability/automation in Ansible scripts 

## Smart Edge Open - 20.03
- Realtime Kernel support for network edge with K8s.
- Modular playbooks

## Smart Edge Open - 20.06
- Optimized the Kubernetes based deployment by supporting multiple Flavors 

## Smart Edge Open - 20.09
- Further optimized the Kubernetes based deployment by supporting multiple Flavors
- cAdvisor occasional failure issue is resolved
- "Traffic rule creation: cannot parse filled and cleared fields" in Legacy OnPremises is fixed
- Issue fixed when removing Edge Node from Controller when its offline and traffic policy is configured or app deployed

## Smart Edge Open - 20.12
- Known issue with Pod that uses hugepage get stuck in terminating state on deletion hs been fixed after upgrading to Kubernetes 1.19.3
- Upgraded to Kube-OVN v1.5.2 for further Kube-OVN CNI enhancements

## Smart Edge Open - 20.12.02
- Fixed EdgeDNS service building failure resulting in deployment failure
- Fixed FlexRAN and FlexRAN Telemetry flavors to eliminate deployment failures
- Fixed Calico and SR-IOV deployment failures
- Fixed TAS deployment
- Updated SR-IOV CNI and device plugin to fix issues with image build in offline package creator

## Smart Edge Open - 21.03
- Offline deployment issues related to zlib-devel version 1.2.7-19
- CAdvisor resource utilization has been optimized using "--docker_only=true" which decreased CPU usage from 15-25% to 5-6% (confirmed with ‘docker stats’ and ‘top’ commands). Memory usage also decreased by around 15-20%.

## Smart Edge Open - 21.03.01
- Resolved an intermittent issue with Kubernetes repository signature verification

## Smart Edge Open - 21.03.02
- Fixed DPDK compilation issue when primary CNI is Calico with eBPF and kernel is 5.X.
- Resolved FlexRAN tests instability for Access Edge Smart Edge Open Experience Kit by using CGroupFS as CGroup driver for Kubernetes and Docker.
- Resolved intermittent Pip installation issues.
- Corrected Azure single node deployment issues due to incorrect configuration in the setup script.
- Resolved offline installation of Ansible prerequisites.
- VCA card is now correctly brought up after node reboot.
- Fixed EIS and gNB deployments.
- Fixed interoperation issues with 5GC control plane functions.

## Smart Edge Open - 21.03.03
- Fixed multi-node deployment for Azure cloud by changing CNI to kube-ovn as Calico is not supported by Azure.

## Smart Edge Open - 21.09
- Fixed stability and reliability with 5G Private Wireless Experience Kit with Integrated RAN. 
# Known Issues and Limitations
## Smart Edge Open - 19.06
There are no issues relevant to this release.

## Smart Edge Open - 19.06.01
There is one issue relevant to this release: it is not possible to remove the application from Edge Node in case of error during application deployment. The issue concerns applications in a Virtual Machine.

## Smart Edge Open - 19.09
- Gateway in multi-node - will not work when few nodes will have the same public IP (they will be behind one common NAT)
- Ansible in K8s can cause problems when rerun on a machine:
  - If after running all 3 scripts
  - Script 02 will be run again (it will not remove all necessary K8s related artifacts)
  - We would recommend cleaning up the installation on the node

## Smart Edge Open - 19.12
- Gateway in multi-node - will not work when few nodes will have the same public IP (they will be behind one common NAT)
- Smart Edge Open On-Premises: Cannot remove a failed/disconnected the edge node information/state from the controller
- The CNCA API (4G & 5G) supported in this release is an early access reference implementation and does not support authentication
- Real-time kernel support has been temporarily disabled to address the Kubernetes 1.16.2 and Realtime kernel instability.

## Smart Edge Open - 20.03
- On-Premises edge installation takes more than 1.5 hours because of the Docker image build for OVS-DPDK 
- Network edge installation takes more than 1.5 hours because of the Docker image build for OVS-DPDK
- Smart Edge Open controller allows management NICs to be in the pool of configuration, which might allow configuration by mistake. Thus, disconnecting the node from control plane
- When using the SRIOV EPA feature added in 20.03 with OVNCNI, the container cannot access the CNI port. This is due to the SRIOV port being set by changing the network used by the container from default to a custom network. This overwrites the OVNCNI network setting configured before this to enable the container to work with OVNCNI. Another issue with the SRIOV, is that this also overwrites the network configuration with the EAA and edgedns, agents, which prevents the SRIOV enabled container from communicating with the agents.
- Cannot remove Edge Node from Controller when its offline and traffic policy is configured or the app is deployed.

## Smart Edge Open - 20.06
- On-Premises edge installation takes 1.5hrs because of the Docker image build for OVS-DPDK 
- Network edge installation takes 1.5hrs because of docker image build for OVS-DPDK
- Smart Edge Open controller allows management NICs to be in the pool of configuration, which might allow configuration by mistake and thereby disconnect the node from control plane
- When using the SRIOV EPA feature added in 20.03 with OVNCNI, the container cannot access the CNI port. This is due to the SRIOV port being set by changing the network used by the container from default to a custom network, This overwrites the OVNCNI network setting configured prior to this to enable the container to work with OVNCNI. Another issue with the SRIOV, is that this also overwrites the network configuration with the EAA and edgedns, agents, which prevents the SRIOV enabled container from communicating with the agents.
- Cannot remove Edge Node from Controller when its offline and traffic policy is configured or app is deployed. 
- Legacy OnPremises - Traffic rule creation: cannot parse filled and cleared fields
- There is an issue with using CDI when uploading VM images when CMK is enabled due to missing CMK taint toleration. The CDI upload pod does not get deployed and the `virtctl` plugin command times out waiting for the action to complete. A workaround for the issue is to invoke the CDI upload command, edit the taint toleration for the CDI upload to tolerate CMK, update the pod, create the PV, and let the pod run to completion.
- There is a known issue with cAdvisor which in certain scenarios occasionally fails to expose the metrics for the Prometheus endpoint. See the following GitHub\* link: https://github.com/google/cadvisor/issues/2537

## Smart Edge Open - 20.09
- Pod which uses hugepage get stuck in terminating state on deletion. This is a known issue on Kubernetes 1.18.x and is planned to be fixed in 1.19.x
- Calico cannot be used as secondary CNI with Multus in Smart Edge Open. It will work only as primary CNI. Calico must be the only network provider in each cluster. We do not currently support migrating a cluster with another network provider to use Calico networking. https://docs.projectcalico.org/getting-started/kubernetes/requirements
- Collectd Cache telemetry using RDT does not work when RMD is enabled because of resource conflict. Workaround is to disable collectd RDT plugin when using RMD - this by default is implemented globally. With this workaround customers will be able to allocate the Cache but not use Cache related telemetry. In case where RMD is not being enabled customers who desire RDT telemetry can re-enable collectd RDT.

## Smart Edge Open - 20.12
- cAdvisor CPU utilization of Edge Node is high and could cause a delay to get an interactive SSH session. A work around is to remove CAdvisor if not needed using `helm uninstall cadvisor -n telemetry`
- An issue appears when the KubeVirt Containerized Data Importer (CDI) upload pod is deployed with Kube-OVN CNI, the deployed pods readiness probe fails and pod is never in ready state. It is advised that the user uses other CNI such as Calico CNI when using CDI with Smart Edge Open
- Limitation of AF/NEF APIs usage: AF and NEF support only queued requests, hence the API calls should be made in sequence one after another using CNCA for the deterministic responses. If the API calls are made directly from multiple threads concurrently, the behavior is nondeterministic
- Telemetry deployment with PCM enabled will cause a deployment failure in single node cluster deployments due to PCM dashboards for Grafana not being found

## Smart Edge Open - 20.12.02
- Offline deployment issues related to zlib-devel version 1.2.7-19

## Smart Edge Open - 21.03
- An issue appears when the KubeVirt Containerized Data Importer (CDI) upload pod is deployed with Kube-OVN CNI, the deployed pods readiness probe fails and pod is never in ready state. Calico CNI is used by default in Smart Edge Open when using CDI
- Telemetry deployment with PCM enabled will cause a deployment failure in single node cluster deployments due to conflict with CollectD deployment, it is advised to not use PCM and CollectD at the same time in Smart Edge Open at this time
- Kafka and Zookeeper resource consumption is on the higher side. When deployed in the context of uCPE and SD-WAN users need to consider this. 
- When flannel CNI is being used and worker node is being manually joined or re-joined to the cluster, then 
`kubectl patch node NODE_NAME -p '{ "spec":{ "podCIDR":"10.244.0.0/24" }}`
command should be issued on controller to enable flannel CNI on that node.
- Cloud native enablement for Access Edge Smart Edge Open Experience Kit is functional, however FlexRAN tests in timermode shows instability in this release. This issue is being investigated and will be addressed with a hotfix post release.

## Smart Edge Open - 21.03.02
- Multi-node deployment through Azure cloud fails due to the default (Calico) CNI not being supported by Azure.

## Smart Edge Open - 21.09

- Radisys CU is validated with a single SR-IOV virtual function. 
- When the Telco profile is set in the Dell R750 BIOS, the CPU frequency driver is not configured on the Linux OS. 
  - Mitigation: Perform a reboot and retry. If the issue persists contact Dell Support. 
- Performing airplane mode enable and disable on an attached UE results in a UE disconnect
  -  Mitigation: Restart the DU and 5GC Pods

# Release Content

## Smart Edge Open - 19.06
Smart Edge Open Edge node, Smart Edge Open Controller, Common, Spec, and Smart Edge Open Applications. 

## Smart Edge Open - 19.06.01
Smart Edge Open Edge node, Smart Edge Open Controller, Common, Spec, and Smart Edge Open Applications. 

## Smart Edge Open - 19.09
Smart Edge Open Edge node, Smart Edge Open Controller, Common, Spec, and Smart Edge Open Applications. 

## Smart Edge Open - 19.12
Smart Edge Open Edge node, Smart Edge Open Controller, Common, Spec, Smart Edge Open Applications, and Experience kit. 

## Smart Edge Open - 20.03
Smart Edge Open Edge node, Smart Edge Open Controller, Common, Spec, Smart Edge Open Applications, and Experience kit. 

## Smart Edge Open - 20.06
- Open Source: Edge node, Controller, Epcforedge, Common, Spec, Applications, and Experience kit. 
- IDO: IDO Edge node, IDO Controller, IDO Epcforedge, IDO Spec, and IDO Experience kit.

## Smart Edge Open - 20.09 
- Open Source: Edge node, Controller, Epcforedge, Common, Spec, Applications and Experience kit. 
- IDO: IDO Edge node, IDO Controller, IDO Epcforedge, IDO Spec and IDO Experience kit.

## Smart Edge Open - 20.12 
- Open Source: Edge node, Controller, Epcforedge, Common, Spec, Applications and Experience kit. 
- IDO: IDO Edge node, IDO Controller, IDO Epcforedge, IDO Spec and IDO Experience kit.

> **NOTE**: Edge applications repo is common to Open Source and IDO

## Smart Edge Open - 20.12.02
- Open Source: Edge node, Controller, Epcforedge, Common, Spec, Applications and Experience kit.
- IDO: IDO Edge node, IDO Controller, IDO Epcforedge, IDO Spec and IDO Experience kit.

## Smart Edge Open - 21.03
  - https://github.com/smart-edge-open/ido-converged-edge-experience-kits
  - https://github.com/smart-edge-open/ido-specs
  - https://github.com/smart-edge-open/ido-edgeservices
  - https://github.com/smart-edge-open/ido-epcforedge
# Hardware and Software Compatibility
Smart Edge Open Edge Node has been tested using the following hardware specification:

## Intel® Xeon® D Processor
- Supermicro\* 3U form factor chassis server, product SKU code: 835TQ-R920B
- Motherboard type: [X11SDV-16C-TP8F](https://www.supermicro.com/products/motherboard/Xeon/D/X11SDV-16C-TP8F.cfm)
- Intel® Xeon® Processor D-2183IT

## 3rd Generation Intel® Xeon® Scalable Processors - Early Access

2 Intel® Xeon® Gold 6338N Processors: 2.2G, 32C/64T, 11.2GT/s, 48M Cache, Turbo, HT (185W) DDR4-2666    
1 2.5 Chassis    
1 N9
1 No Rear Storage    
1 Additional Processor Selected    
1 NVMe Backplane    
1 GPU Enablement    
1 iDRAC,Legacy Password    
1 iDRAC Group Manager, Disabled    
1 2.5" Chassis with up to 16 NVMe Drives    
1 PowerEdge 2U LCD Bezel    
1 Riser Config 7, 2x8, 2x16 slots    
1 Dell EMC Luggage Tag    
1 No Quick Sync     
1 Performance Optimized    
1 3200MT/s RDIMMs     
16 32GB RDIMM, 3200MT/s, Dual Rank    
1 iDRAC9, Enterprise 15G    
1 No Hard Drive     
1 1.6TB Enterprise NVMe Mixed Use AG Drive U.2 Gen4 with carrier     
1 BOSS-S2 controller card + with 2 M.2 480GB (RAID 1)    
1 No Controller     
1 Heatsink for 2 CPU with GPU configuration    
1 Dual, Hot-Plug,Power Supply Redundant (1+1), 1400W, Mixed Mode     
2 C13 to C14, PDU Style, 10 AMP, 6.5 Feet (2m), Power Cord     
1 Trusted Platform Module 2.0 V3     
1 Order Configuration Shipbox Label (Ship Date, Model, Processor Speed, HDD Size, RAM)      
1 Asset Tag - ProSupport (Website, barcode, Onboard MacAddress)      
1 BOSS Cables and Bracket for R750 (Riser 1)      
1 PowerEdge R750 Shipping Material     
1 GPU Ready Configuration Cable Install Kit R750      
2 Intel® X710 DA-4FH Network Card  
1 Very High Performance Fan x6 V3     
1 Fan Foam, HDD 2U    
1 Power Saving Dell Active Power Controller    
1 C30, No RAID for NVME chassis Software   
1 TPM Module                         |

 
## 2nd Generation Intel® Xeon® Scalable Processors

|              |                                                            |
| ------------ | ---------------------------------------------------------- |
| CLX-SP       | Compute Node based on CLX-SP(6252N)                        |
| Board        | S2600WFT server board                                      |
|              | 2 x Intel® Xeon® Gold 6252N CPU @ 2.30GHz                  |
|              | 2 x associated Heatsink                                    |
| Memory       | 12x Micron 16GB DDR4 2400MHz DIMMS* [2666 for PnP]         |
| Chassis      | 2U Rackmount Server Enclosure                              |
| Storage      | Intel M.2 SSDSCKJW360H6 360G                               |
| NIC          | 1x Intel® Fortville NIC X710DA4 SFP+ ( PCIe card to CPU-0) |
| QAT          | Intel® Quick Assist Adapter Device 37c8                    |
|              | (Symmetrical design) LBG integrated                        |
| NIC on board | Intel-Ethernet-Controller-I210 (for management)            |
| Other card   | 2x PCIe Riser cards                                        |

## Intel® Xeon® Scalable Processors

|              |                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SKX-SP       | Compute Node based on SKX-SP(6148)                                                                                                                                                                      |
| Board        | WolfPass S2600WFQ server board(symmetrical QAT)CPU                                                                                                                                                      |
|              | 2 x Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz                                                                                                                                                            |
|              | 2 x associated Heatsink                                                                                                                                                                                 |
| Memory       | 12x Micron 16GB DDR4 2400MHz DIMMS* [2666 for PnP]                                                                                                                                                      |
| Chassis      | 2U Rackmount Server Enclosure                                                                                                                                                                           |
| Storage      | Intel® M.2 SSDSCKJW360H6 360G                                                                                                                                                                           |
| NIC          | 1x Intel® Fortville NIC X710DA4 SFP+ ( PCIe card to CPU-0)                                                                                                                                              |
| QAT          | Intel® Quick Assist Adapter Device 37c8                                                                                                                                                                 |
|              | (Symmetrical design) LBG integrated                                                                                                                                                                     |
| NIC on board | Intel-Ethernet-Controller-I210 (for management)                                                                                                                                                         |
| Other card   | 2x PCIe Riser cards                                                                                                                                                                                     |
| HDDL-R       | [Mouser Mustang-V100](https://www.mouser.ie/datasheet/2/763/Mustang-V100_brochure-1526472.pdf)                                                                                                          |
| VCAC-A       | [VCAC-A Accelerator for Media Analytics](https://www.intel.com/content/dam/www/public/us/en/documents/datasheets/media-analytics-vcac-a-accelerator-card-by-celestica-datasheet.pdf)                    |
| PAC-N3000    | [Intel® FPGA Programmable Acceleration Card (Intel® FPGA PAC) N3000 ](https://www.intel.com/content/www/us/en/programmable/products/boards_and_kits/dev-kits/altera/intel-fpga-pac-n3000/overview.html) |
| ACC100       | [Intel® vRAN Dedicated Accelerator ACC100](https://networkbuilders.intel.com/solutionslibrary/intel-vran-dedicated-accelerator-acc100-product-brief)                                                    |

# Supported Operating Systems

Smart Edge Open was tested on CentOS Linux release 7.9.2009 (Core)
> **NOTE**: Smart Edge Open is tested with CentOS 7.9 Pre-empt RT kernel to ensure VNFs and Applications can co-exist. There is no requirement from Smart Edge Open software to run on a Pre-empt RT kernel.

# Packages Version

Package: telemetry, cadvisor 0.37.5, grafana 7.4.2, prometheus 2.24.0, prometheus: node exporter 1.0.1, golang 1.16, docker 20.10.2, kubernetes 1.20.0, dpdk 19.11.1, ovs 2.14.0, ovn 2.14.0, helm 3.1.2, kubeovn 1.5.2, flannel 0.13.0, calico 3.17.0, multus 3.6, sriov cni 2.6, nfd 0.6.0, cmk v1.4.1, TAS (from specific commit "a13708825e854da919c6fdf05d50753113d04831"), openssl 1.1.1i, QEMU 5.2

> Smart Edge Open uses openwrt-18.06.4-x86-64 for the SD-WAN reference solution and it does not include the latest functional and security updates. openwrt-19.07.5-x86-64 or the latest at the time of development will be targeted to be released in 2nd Half of 2021 and will include additional functional and security updates. Customers should update to the latest version as it becomes available.

# Disclaimer
Smart Edge Open 21.09 does not include the latest functional and security updates. Smart Edge Open is targeted to be released in Q4'2021 and will include additional functional and security updates. Customers should update to the latest version as it becomes available.
