```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2019 Intel Corporation
```
<!-- omit in toc -->
# InterApp Communication Support in OpenNESS
- [Overview](#overview)
- [InterApp Communication support in OpenNESS Network Edge](#interapp-communication-support-in-openness-network-edge)

## Overview

Multi-core edge cloud platforms typically host multiple containers or virtual machines as PODs. These applications sometimes need to communicate with each other as part of a service or consuming services from another application instance. This means that an edge cloud platform should provide not just the data plane interface (to enable user data transfer to and from clients) but also the infrastructure to enable applications to communicate with each other whether they are on the same platform or spanning across multiple platforms. OpenNESS provides the infrastructure for both in the Network Edge mode.

>**NOTE**: The InterApps Communication mentioned here is not just for applications but it is also applicable for Network functions (Core Network User plane, Base station, etc.).

## InterApp Communication support in OpenNESS Network Edge

InterApp communication on the OpenNESS Network edge version is supported using OVN/OVS as the infrastructure. OVN/OVS in the network edge is supported through the Kubernetes kube-OVN Container Network Interface (CNI).
<!-- Define OVN/OVS on first use. Also, use capitalization of nouns when appropriate + be consistent in use. UE? -->


OVN/OVS is used as a default networking infrastructure for:
- Data plane interface: UE's to edge applications
- InterApp interface : Communication infrastructure for applications to communicate
- Default interface: Interface for managing the Application POD (e.g., SSH to application POD)
- Cloud/Internet interface: Interface for Edge applications to communicate with the cloud/Internet

![Data Plane Interfaces in OpenNESS Network Edge](iap-images/iap2.png)

 _Figure - OpenNESS Network Edge Interfaces_
