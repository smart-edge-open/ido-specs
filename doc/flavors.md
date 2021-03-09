```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2020 Intel Corporation
```
<!-- omit in toc -->
- [OpenNESS Deployment Flavors](#openness-deployment-flavors)
  - [CERA Minimal Flavor](#cera-minimal-flavor)
  - [CERA Access Edge Flavor](#cera-access-edge-flavor)
  - [CERA Media Analytics Flavor](#cera-media-analytics-flavor)
  - [CERA Media Analytics Flavor with VCAC-A](#cera-media-analytics-flavor-with-vcac-a)
  - [CERA CDN Transcode Flavor](#cera-cdn-transcode-flavor)
  - [CERA CDN Caching Flavor](#cera-cdn-caching-flavor)
  - [CERA Core Control Plane Flavor](#cera-core-control-plane-flavor)
  - [CERA Core User Plane Flavor](#cera-core-user-plane-flavor)
  - [CERA Untrusted Non3gpp Access Flavor](#cera-untrusted-non3gpp-access-flavor)
  - [CERA Near Edge Flavor](#cera-near-edge-flavor)
  - [CERA 5G On-Prem Flavor](#cera-5g-on-prem-flavor)
  - [Reference Service Mesh](#reference-service-mesh)
  - [Central Orchestrator Flavor](#central-orchestrator-flavor)

# OpenNESS Deployment Flavors

This document introduces the supported deployment flavors that are deployable through OpenNESS Experience Kits (OEKs.

## CERA Minimal Flavor

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

To customize this flavor we recommend creating additional file in openness-experience-kits that will override any variables used in previous configuration. This file should be placed in location: `openness-experiance-kits/inventory/default/group_vars/all` and filenames should start with number greater than highest value currently present (e.g. `40-overrides.yml`). 

## CERA Access Edge Flavor

The pre-defined *flexran* deployment flavor provisions an optimized system configuration for vRAN workloads on Intel® Xeon® platforms. It also provisions for deployment of Intel® FPGA Programmable Acceleration Card (Intel® FPGA PAC) N3000 tools and components to enable offloading for the acceleration of FEC (Forward Error Correction) to the FPGA.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Configure the flavor file to reflect desired deployment.
   - Configure the CPUs selected for isolation and OS/K8s processes from command line in files [controller_group.yml](https://github.com/otcshare/openness-experience-kits/blob/master/flavors/flexran/controller_group.yml) and [edgenode_group.yml](https://github.com/otcshare/openness-experience-kits/blob/master/flavors/flexran/edgenode_group.yml) - please note that in single node mode the edgenode_group.yml is used to configure the CPU isolation.
   - Configure the amount of CPUs reserved for K8s and OS from K8s level with `reserved_cpu` flag in [all.yml](https://github.com/otcshare/openness-experience-kits/blob/master/flavors/flexran/all.yml) file.
   - Configure whether the FPGA or eASIC support for FEC is desired or both in [all.yml](https://github.com/otcshare/openness-experience-kits/blob/master/flavors/flexran/all.yml) file.
  
3. Run OEK deployment script:
    ```shell
    $ deploy_ne.sh -f flexran
    ```
This deployment flavor enables the following ingredients:
* Node Feature Discovery
* SRIOV device plugin with FPGA configuration
* Calico CNI
* Telemetry
* FPGA remote system update through OPAE
* FPGA configuration
* eASIC ACC100 configuration
* RT Kernel
* Topology Manager
* RMD operator

## CERA Media Analytics Flavor

The pre-defined *media-analytics* deployment flavor provisions an optimized system configuration for media analytics workloads on Intel® Xeon® platforms. It also provisions a set of video analytics services based on the [Video Analytics Serving](https://github.com/intel/video-analytics-serving) for analytics pipeline management and execution.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f media-analytics
    ```

> **NOTE:** The video analytics services integrates with the OpenNESS service mesh when the flag `ne_istio_enable: true` is set.
> **NOTE:** Kiali management console username can be changed by editing the variable `istio_kiali_username`. By default `istio_kiali_password` is randomly generated and can be retirieved by running `kubectl get secrets/kiali -n istio-system -o json | jq -r '.data.passphrase' | base64 -d` on the Kubernetes controller.

This deployment flavor enables the following ingredients:
* Node feature discovery
* The default Kubernetes CNI: `kube-ovn`
* Video analytics services
* Telemetry
* Istio service mesh - conditional
* Kiali management console - conditional

## CERA Media Analytics Flavor with VCAC-A

The pre-defined *media-analytics-vca* deployment flavor provisions an optimized system configuration for media analytics workloads leveraging Visual Cloud Accelerator Card – Analytics (VCAC-A) acceleration. It also provisions a set of video analytics services based on the [Video Analytics Serving](https://github.com/intel/video-analytics-serving) for analytics pipeline management and execution.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Add the VCA hostname in the `[edgenode_vca_group]` group in `inventory/default/inventory.ini` file of the OEK, for example:
    ```
    [edgenode_vca_group]
    silpixa00400194
    ```

    > **NOTE:** The VCA host name should *only* be placed once in the `inventory/default/inventory.ini` file and under the `[edgenode_vca_group]` group.

3. Run the OEK deployment script:
    ```shell
    $ deploy_ne.sh -f media-analytics-vca
    ```

> **NOTE:** At the time of writing this document, *Weave Net*\* is the only supported CNI for network edge deployments involving VCAC-A acceleration. The `weavenet` CNI is automatically selected by the *media-analytics-vca*.
> **NOTE:** The flag `force_build_enable` (default true) supports force build VCAC-A system image (VCAD) by default, it is defined in flavors/media-analytics-vca/all.yml. By setting the flag as false, OEK will not rebuild the image and re-use the last system image built during deployment. If the flag is true, OEK will force build VCA host kernel and node system image which will take several hours.

This deployment flavor enables the following ingredients:
* Node feature discovery
* VPU and GPU device plugins
* HDDL daemonset
* The `weavenet` Kubernetes CNI
* Video analytics services
* Telemetry

## CERA CDN Transcode Flavor

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

## CERA CDN Caching Flavor

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

## CERA Core Control Plane Flavor

The pre-defined Core Control Plane flavor provisions the minimal set of configurations for 5G Control Plane Network Functions on Intel® Xeon® platforms.

The following are steps to install this flavor:

1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).

2. Run the x-OEK deployment script:
   ```
   $ ido-openness-experience-kits# deploy_ne.sh -f core-cplane
   ```

This deployment flavor enables the following ingredients:

- Node feature discovery
- The default Kubernetes CNI: kube-ovn
- Telemetry
- OpenNESS 5G Microservices
- OAM(Operation, Administration, Maintenance) and AF(Application Function) on the OpenNESS Controller/K8S Master.
- Reference NEF(Network Exposure Function) and CNTF(Core Network Test Function) on the OpenNESS Edge Nodes/K8S Node.
- Istio service mesh
- Kiali management console

> **NOTE:** It is an expectation that the `core-cplane` deployment flavor is done for a setup consisting of *at least one* OpenNESS edge node, i.e: the `inventory/default/inventory.ini` must contain at least one host name under the `edgenode_group` section.

> **NOTE:** For a real deployment with the 5G Core Network Functions the NEF and CNTF can be uninstalled using helm charts. Refer to [OpenNESS using CNCA](applications-onboard/using-openness-cnca.md)

> **NOTE:** Istio service mesh is enabled by default in the `core-cplane` deployment flavor. To deploy 5G CNFs without Istio, the flag `ne_istio_enable` in `flavors/core-cplane/all.yml` must be set to `false`.

## CERA Core User Plane Flavor

The pre-defined Core Control Plane flavor provisions the minimal set of configurations for a 5G User Plane Function on Intel® Xeon® platforms.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).

2. Run the x-OEK deployment script:
   ```
   $ ido-openness-experience-kits# deploy_ne.sh -f core-uplane
   ```

This deployment flavor enables the following ingredients:

- Node feature discovery
- Kubernetes CNI: kube-ovn and SRIOV.
- CPU Manager for Kubernetes (CMK) with 4 exclusive cores (1 to 4) and 1 core in shared pool.
- Kubernetes Device Plugin
- Telemetry
- HugePages of size 1Gi and the amount of HugePages as 8G for the nodes

> **NOTE**: For a reference UPF deployment, refer to [5G UPF Edge App](https://github.com/otcshare/edgeapps/tree/master/network-functions/core-network/5G/UPF)

## CERA Untrusted Non3gpp Access Flavor

The pre-defined Untrusted Non3pp Access flavor provisions the minimal set of configurations for a 5G Untrusted Non3gpp Access Network Functions like Non3GPP Interworking Function(N3IWF) on Intel® Xeon® platforms.

The following are steps to install this flavor:

1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).

2. Run the x-OEK deployment script:

   ```bash
   $ ido-openness-experience-kits# deploy_ne.sh -f untrusted-non3pp-access
   ```

This deployment flavor enables the following ingredients:

- Node feature discovery
- Kubernetes CNI: calico and SR-IOV.
- Kubernetes Device Plugin
- Telemetry
- HugePages of size 1Gi and the amount of HugePages as 10G for the nodes

## CERA Near Edge Flavor

The pre-defined CERA Near Edge flavor provisions the required set of configurations for a 5G Converged Edge Reference Architecture for Near Edge deployments on Intel® Xeon® platforms.

The following are steps to install this flavor:
1. Configure the OEK under CERA repository as described in the [Converged Edge Reference Architecture Near Edge](https://github.com/otcshare/ido-specs/blob/master/doc/reference-architectures/CERA-Near-Edge.md).

2. Run the x-OEK for CERA deployment script:
   ```shell
   $ ido-converged-edge-experience-kits# deploy_openness_for_cera.sh
   ```

This deployment flavor enables the following ingredients:

- Kubernetes CNI: kube-ovn and SRIOV.
- SR-IOV support for kube-virt
- Virtual Functions
- CPU Manager for Kubernetes (CMK) with 16 exclusive cores and 1 core in shared pool.
- Kubernetes Device Plugin
- BIOSFW feature
- Telemetry
- HugePages of size 1Gi and the amount of HugePages as 8G for the nodes
- RMD operator

## CERA 5G On-Prem Flavor

The pre-defined CERA Near Edge flavor provisions the required set of configurations for a 5G Converged Edge Reference Architecture for On Premises deployments on Intel® Xeon® platforms. It also provisions for deployment of Intel® FPGA Programmable Acceleration Card (Intel® FPGA PAC) N3000 tools and components to enable offloading for the acceleration of FEC (Forward Error Correction) to the FPGA.

The following are steps to install this flavor:
1. Configure the OEK under CERA repository as described in the [Converged Edge Reference Architecture On Premises Edge](https://github.com/otcshare/ido-specs/blob/master/doc/reference-architectures/CERA-5G-On-Prem.md).

2. Run the x-OEK for CERA deployment script:
   ```shell
   $ ido-converged-edge-experience-kits# deploy_openness_for_cera.sh
   ```

This deployment flavor enables the following ingredients:

- Kubernetes CNI: Calico and SRIOV.
- SRIOV device plugin with FPGA configuration
- Virtual Functions
- FPGA remote system update through OPAE
- FPGA configuration
- RT Kernel
- Topology Manager
- Kubernetes Device Plugin
- BIOSFW feature
- Telemetry
- HugePages of size 1Gi and the amount of HugePages as 40G for the nodes
- RMD operator

## Reference Service Mesh

Service Mesh technology enables services discovery and sharing of data between application services. This technology can be useful in any CERA. Customers will find Service Mesh under flavors directory as a reference to quickly try out the technology and understand the implications. In future OpenNESS releases this Service Mesh will not be a dedicated flavor. 

The pre-defined *service-mesh* deployment flavor installs the OpenNESS service mesh that is based on [Istio](https://istio.io/).

> **NOTE**: When deploying Istio Service Mesh in VMs, a minimum of 8 CPU core and 16GB RAM must be allocated to each worker VM so that Istio operates smoothly

Steps to install this flavor are as follows:
1. Configure OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run OEK deployment script:
    ```shell
    $ deploy_ne.sh -f service-mesh
    ```

This deployment flavor enables the following ingredients:
* Node Feature Discovery
* The default Kubernetes CNI: `kube-ovn`
* Istio service mesh
* Kiali management console
* Telemetry

> **NOTE:** Kiali management console username can be changed by editing the variable `istio_kiali_username`. By default `istio_kiali_password` is randomly generated and can be retirieved by running `kubectl get secrets/kiali -n istio-system -o json | jq -r '.data.passphrase' | base64 -d` on the Kubernetes controller.

Following parameters in the flavor/all.yaml can be customize for Istio deployment:

```code 
# Istio deployment profile possible values: default, demo, minimal, remote
istio_deployment_profile: "default"

# Kiali
istio_kiali_username: "admin"
istio_kiali_password: "{{ lookup('password', '/dev/null length=16') }}"
istio_kiali_nodeport: 30001
```

> **NOTE:** If creating a customized flavor, the Istio service mesh installation can be included in the Ansible playbook by setting the flag `ne_istio_enable: true` in the flavor file.

## Central Orchestrator Flavor

Central Orchestrator Flavor is used to deploy EMCO.  

The pre-defined *orchestration* deployment flavor provisions an optimized system configuration for emco (central orchestrator) workloads on Intel Xeon servers. It also provisions a set of central orchestrator services for [edge, multiple clusters orchestration](building-blocks/emco/openness-emco.md).

Steps to install this flavor are as follows:
1. Configure OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run OEK deployment script:
    ```shell
    $ deploy_ne.sh -f central_orchestrator
    ```

This deployment flavor enables the following ingredients:
* Harbor Registry
* The default Kubernetes CNI: `kube-ovn`
* EMCO services

## CERA SD-WAN Edge Flaor

CERA SD-WAN Edge flavor is used to deploy SD-WAN on the OpenNESS cluster acting as an Edge platform. This CERA flavor only supports single-node OpenNESS deployments. It provides configuration that supports running SD-WAN CNFs on the OpenNESS cluster, enables hardware accelerators with the HDDL plugin, and adds support for service mesh and node feature disovery to aid other applications and services runing on the Edge node. This CERA flavor disbless EAA, Kafka adn Edge DNS services for platform optimization.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the x-openness-experience-kits deployment script:
    ```shell
    $ deploy_ne.sh -f sdewan-edge single
    ```

This CERA flavor enables the following deployment configuration:
* Istio servise mesh on the default namespace
* Node Feature Discovery
* The primamary K8s CNI: 'calico'
* The secondary K8s CNI: 'ovn4nfv'
* HDDL support
* Telemetry
* Reserved CPUs for K8s and OS daemons
* Kiali management console

This CERA flavor disables the following deployment configuration:
* EAA service with Kafka
* Edge DNS

## CERA SD-WAN Hub Flavor

CERA SD-WAN Hub flavor is used to deploy SD-WAN on the OpenNESS cluster acting as a Hub for Edge clusters. It only supports single-node OpenNESS deployments. This CERA flavor disabless EAA, Kafka and EAA services for platform optimization.

The following are steps to install this flavor:
1. Configure the OEK as described in the [OpenNESS Getting Started Guide for Network Edge](getting-started/network-edge/controller-edge-node-setup.md).
2. Run the x-openness-experience-kits deployment script:
    ```shell
    $ deploy_ne.sh -f sdewan-hub single
    ```

This CERA flavor enables the following deployment configuration:
* The primamary CNI 'calico'
* The secondary CNI 'ovn4nfv'
* Telemetry
* Reserved CPUs for K8s and OS daemons
* Kiali management console


This CERA flavor disables the following deployemnt configuration:
* Node Feature Discovery
* EAA service with Kafka
* Edge DNS
* HDDL support