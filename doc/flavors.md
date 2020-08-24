```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2020 Intel Corporation
```
<!-- omit in toc -->
# OpenNESS Deployment Flavors
This document introduces the supported deployment flavors that are deployable through OpenNESS Experience Kits (OEKs.
- [Minimal Flavor](#minimal-flavor)
- [FlexRAN Flavor](#flexran-flavor)
- [Media Analytics Flavor](#media-analytics-flavor)
- [Media Analytics Flavor with VCAC-A](#media-analytics-flavor-with-vcac-a)
- [CDN Transcode Flavor](#cdn-transcode-flavor)
- [CDN Caching Flavor](#cdn-caching-flavor)
- [Core Control Plane Flavor](#core-control-plane-flavor)
- [Core User Plane Flavor](#core-user-plane-flavor)

## Minimal Flavor
The pre-defined *minimal* deployment flavor provisions the minimal set of configurations for bringing up the OpenNESS network edge deployment.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f minimal
    ```

This deployment flavor enables the following ingredients:
* Node feature discovery
* The default Kubernetes CNI: `kube-ovn`
* Telemetry

## FlexRAN Flavor 
The pre-defined *flexran* deployment flavor provisions an optimized system configuration for vRAN workloads on Intel® Xeon® platforms. It also provisions for deployment of Intel® FPGA Programmable Acceleration Card (Intel® FPGA PAC) N3000 tools and components to enable offloading for the acceleration of FEC (Forward Error Correction) to the FPGA.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f flexran
    ```
This deployment flavor enables the following ingredients:
* Node feature discovery
* SRIOV device plugin with FPGA configuration
* Calico CNI
* Telemetry
* FPGA remote system update through OPAE
* FPGA configuration
* RT Kernel
* Topology Manager
* RMD operator

## Media Analytics Flavor
The pre-defined *media-analytics* deployment flavor provisions an optimized system configuration for media analytics workloads on Intel® Xeon® platforms. It also provisions a set of video analytics services based on the [Video Analytics Serving](https://github.com/intel/video-analytics-serving) for analytics pipeline management and execution.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f media-analytics
    ```

This deployment flavor enables the following ingredients:
* Node feature discovery
* VPU and GPU device plugins
* HDDL daemonset
* The default Kubernetes CNI: `kube-ovn`
* Video analytics services
* Telemetry

## Media Analytics Flavor with VCAC-A
The pre-defined *media-analytics-vca* deployment flavor provisions an optimized system configuration for media analytics workloads leveraging Visual Cloud Accelerator Card – Analytics (VCAC-A) acceleration. It also provisions a set of video analytics services based on the [Video Analytics Serving](https://github.com/intel/video-analytics-serving) for analytics pipeline management and execution.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Add the VCA hostname in the [edgenode_vca_group] group in `inventory.ini` file of the OEK, for example:
    ```
    [edgenode_vca_group]
    silpixa00400194
    ```
3. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f media-analytics-vca
    ```

> **NOTE:** At the time of writing this document, *Weave Net*\* is the only supported CNI for network edge deployments involving VCAC-A acceleration. The `weavenet` CNI is automatically selected by the *media-analytics-vca*.

This deployment flavor enables the following ingredients:
* Node feature discovery
* VPU and GPU device plugins
* HDDL daemonset
* The `weavenet` Kubernetes CNI
* Video analytics services
* Telemetry

## CDN Transcode Flavor
The pre-defined *cdn-transcode* deployment flavor provisions an optimized system configuration for Content Delivery Network (CDN) transcode sample workloads on Intel® Xeon® platforms. 

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f cdn-transcode
    ```

This deployment flavor enables the following ingredients:
* Node feature discovery
* The default Kubernetes CNI: `kube-ovn`
* Telemetry

## CDN Caching Flavor
The pre-defined *cdn-caching* deployment flavor provisions an optimized system configuration for CDN content delivery workloads on Intel® Xeon® platforms. 

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f cdn-caching
    ```

This deployment flavor enables the following ingredients:
* Node feature discovery
* The `kube-ovn` and `sriov` Kubernetes CNI
* Telemetry
* Kubernetes Topology Manager policy: `single-numa-node`

## Core Control Plane Flavor

The pre-defined Core Control Plane flavor provisions the minimal set of configurations for 5G Control Plane Network Functions on Intel® Xeon® platforms. 

The following are steps to install this flavor:

1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).

2. Run the x-OEK deployment script:
   $ ido-openness-experience-kits# deploy_ne.sh -f core-cplane

This deployment flavor enables the following ingredients:

- Node feature discovery
- The default Kubernetes CNI: kube-ovn
- Telemetry
- OpenNESS 5G Microservices
  - OAM (Operation, Administration, Maintenance) and AF (Application Function) on the OpenNESS Controller/K8S Master.
  - Reference NEF (Network Exposure Function) and CNTF (Core Network Test Function) on the OpenNESS Edge Nodes/K8S Node.
> **NOTE**: For a real deployment with the 5G Core Network Functions, the NEF and CNTF can be uninstalled using helm charts. Refer to [OpenNESS using CNCA](applications-onboard/using-openness-cnca.md)

## Core User Plane Flavor

The pre-defined Core Control Plane flavor provisions the minimal set of configurations for a 5G User Plane Function on Intel® Xeon® platforms.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).

2. Run the x-OEK deployment script:
   $ ido-openness-experience-kits# deploy_ne.sh -f core-uplane

This deployment flavor enables the following ingredients:

- Node feature discovery
- Kubernetes CNI: kube-ovn and SRIOV.
- CPU Manager for Kubernetes (CMK) with 4 exclusive cores (1 to 4) and 1 core in shared pool.
- Kubernetes Device Plugin
- Telemetry
- HugePages of size 1Gi and the amount of HugePages as 8G for the nodes

> **NOTE**: For a reference UPF deployment, refer to [5G UPF Edge App](https://github.com/open-ness/edgeapps/tree/master/network-functions/core-network/5G/UPF)
