```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2020 Intel Corporation
```
<!-- omit in toc -->
# Converged Edge Reference Architecture Near Edge
Reference architecture combines wireless and high performance compute for IoT, AI, video and other services.

- [Introduction](#introduction)
- [OpenNESS Converged Edge Reference Architectures](#openness-converged-edge-reference-architectures)
- [CERA Near Edge](#cera-near-edge)
  - [CERA Near Edge Experience Kit](#cera-near-edge-experience-kit)
    - [CERA Near Edge OpenNESS Configuration](#cera-near-edge-openness-configuration)
    - [CERA Near Edge Deployment Architecture](#cera-near-edge-deployment-architecture)
    - [CERA Near Edge Experience Kit Deployments](#cera-near-edge-experience-kit-deployments)
  - [Edge service applications supported on CERA Near Edge](#edge-service-applications-supported-on-cera-near-edge)
    - [OpenVINO](#openvino)
    - [Edge Insights Software](#edge-insights-software)
  - [CERA Near Edge hardware platform](#cera-near-edge-hardware-platform)
    - [Hardware acceleration](#hardware-acceleration)
  - [Data Flow](#data-flow)
  - [CERA Near Edge OpenNESS deployment](#cera-near-edge-openness-deployment)
    - [Setting up target platform before deployment](#setting-up-target-platform-before-deployment)
  - [BIOS Setup](#bios-setup)
    - [Manual setup](#manual-setup)
    - [Setup through the CERA deployment](#setup-through-the-cera-deployment)
  - [Setting up machine with Ansible](#setting-up-machine-with-ansible)
    - [Steps to be performed on the machine, where the Ansible playbook is going to be run](#steps-to-be-performed-on-the-machine-where-the-ansible-playbook-is-going-to-be-run)
  - [CERA Near Edge Experience Kit Deployment](#cera-near-edge-experience-kit-deployment)
- [5G Core Components](#5g-core-components)
  - [dUPF](#dupf)
    - [Overview](#overview)
    - [Deployment](#deployment)
    - [Prerequisites](#prerequisites)
    - [Settings](#settings)
    - [Configuration](#configuration)
  - [UPF](#upf)
    - [Overview](#overview-1)
    - [Deployment](#deployment-1)
    - [Prerequisites](#prerequisites-1)
    - [Settings](#settings-1)
    - [Configuration](#configuration-1)
  - [AMF-SMF](#amf-smf)
    - [Overview](#overview-2)
    - [Deployment](#deployment-2)
    - [Prerequisites](#prerequisites-2)
    - [Settings](#settings-2)
    - [Configuration](#configuration-2)
    - [How to prepare image](#how-to-prepare-image)
  - [Remote-DN](#remote-dn)
    - [Overview](#overview-3)
    - [Prerequisites](#prerequisites-3)
  - [Local-DN](#local-dn)
    - [Overview](#overview-4)
    - [Prerequisites](#prerequisites-4)
  - [OpenVINO](#openvino-1)
    - [Settings](#settings-3)
    - [Deployment](#deployment-3)
    - [Streaming](#streaming)
  - [EIS](#eis)
- [Conclusion](#conclusion)
- [Learn more](#learn-more)
- [Acronyms](#acronyms)

## Introduction
5G and IoT convergence are transforming network infrastructure, paving the way to deliver unprecedented wireless compute power bandwidth and low latency to intelligent devices. Enterprises across many industries are looking to take advantage of 5G to avail of enhanced OTA security and reliability, improve ROI by adding connectivity and intelligence to existing services and making possible new use cases such as advanced automation and outdoor compute.

Intel® is a leader in the move to edge computing. The company has championed the development of the multi-access edge computing (MEC) standard and has fostered an ecosystem of hundreds of network functions software and services providers with solutions for edge computing. This technology innovation and ecosystem help with the challenges of building, testing, onboarding and managing the life cycle of services deployed various edge locations e.g., on a customer premises and network edge locations.

The Converged Edge Reference Architecture (CERA) platform expands the cloud native platform in order to unify and converge networking, media and analytics workloads across various edge locations. The resulting platform simplifies workload convergence at the edge and adds base station density to wireless networks (see Figure 1). The CERA platform abstracts network complexity and streamlines the solution go-to-market process from development to deployment, enabling solution providers to consume, deploy, and scale their services to offer new value to their customers. This reference architecture provides more detail on how to design, build and deploy CERA Near Edge systems.

![Converged workloads](cera-near-edge-images/image-20200826-122458.png)

> Figure 1 - Converged workloads

Edge computing use cases's including artificial intelligence (AI), wireless and cloud native services have become more cost-effective to deploy as powerful universal customer premises equipment (uCPE) products facilitate advanced workload processing and services delivery. Cloud Native infrastructure combined with cloud native services and edge intelligence layered onto the uCPE provide agile and innovative workload processing and services with reasonable deployment and operational costs. 

Cloud native edge platforms based on CERA offer a new value proposition to enterprise vertical market segments, such as smart city, transportation, industrial, and media (see Figure 2) by enabling new video and analytics use cases and delivering improvements in key performance indicators (KPIs) such as reduced latency, back haul savings, data privacy and reliability.

## OpenNESS Converged Edge Reference Architectures 
Converged Edge Reference Architectures manifest themselves as a collection of Ansible playbook, Helm charts and scripts which acts a single interface for users to deploy OpenNESS and optionally network functions and edge applications. The Reference Architecture organizes all the relevant OpenNESS microservices, Kubernetes extensions, enhancements and optimizations under easy to deploy solutions.

The Converged Edge Reference Architectures are categorized into the different edge network locations, each network location has its own unique set of HW and SW requirements that are implemented in the reference architecture. As described in the [OpenNESS Architecture](../architecture.md) the below diagram shows the different network locations.

![OpenNESS Network locations](cera-near-edge-images/network_locations.png)

> Figure 2 - OpenNESS Network locations

This paper will detail the Converged Edge Reference Architecture for Near Edge deployments. 

## CERA Near Edge
The CERA Near Edge deployment focuses on network edge aggregation points, mini central office and presents a scalable solution across the near edge network scaling from a single edge node to a multi cluster deployment services many edge nodes. The assumed 3GPP deployment architecture is based on below figure from 3GPP 23.501 Rel15 which shows the reference point representation for concurrent access to two (e.g. local and central) data networks (single PDU Session option). The highlighted yellow blocks - UPF and Data Network (edge apps) will be deployed on the CERA Near Edge. 

![3GPP Network](cera-near-edge-images/3gpp_near_edge.png)

> Figure 3 - 3GPP Network

The CERA Near edge deployment can be designed in several ways but the biggest design impact is whether near edge deployments support a single or dual orchestration domains. In a single orchestration domain a single Kubernetes cluster is deployed that has edge nodes capable of hosting Network Functions (UPF in this case) and or Applications at the same time. In deployments with dual orchestration domains, network functions and applications are separated into two different Kubernetes clusters. Edge nodes are optimized for the specific type of deployment (network function or applications). 

![Dual orchestration domains or single domain](cera-near-edge-images/cera-near-edge-orchestration-domains.png)

> Figure 4 - Dual orchestration domains or single domain

### CERA Near Edge Experience Kit
In order to support the most flexibility the first CERA Near Edge implementation in OpenNESS supports a single Orchestration domain, optimizing the edge node to support Network Functions (UPF) and Applications at the same time. This is also useful for demonstration purposes as the Near Edge deployment can be scaled down to a single server reducing HW and cost associated with setup. 

#### CERA Near Edge OpenNESS Configuration 
CERA Near edge is a combination of the existing OpenNESS Reference Architecture [CERA NGC](../flavors.md#core-control-plane-flavor), [CERA UPF](../flavors.md#core-user-plane-flavor), [CERA Apps](../flavors.md#minimal-flavor). CERA Near edge takes the NGC Reference Architecture as a base and adds the additional service required to run applications and their associated HW Acceleration for AI workloads. CERA Near edge also adds CMK and RMD to better support workload isolation and mitigate any interference from applications affecting the performance of the network functions. The below diagram shows the logical deployment with the OpenNESS micro services. 

![CERA Near Edge Architecture](cera-near-edge-images/cera-near-edge-arch.png)

> Figure 5 - CERA Near Edge Architecture

#### CERA Near Edge Deployment Architecture

![CERA Near Edge Deployment](cera-near-edge-images/cera_deployment.png)

> Figure 6 - CERA Near Edge Deployment

The CERA Near Edge architecture consists of a multi node (Xeon(R) SP based servers) cluster which can also be modified to support a single platform that hosts both the Edge Node and the Kubernetes Control Plane. The UPF is deployed using SRIOV-Device plugin and SRIOV-CNI allowing direct access to the network interfaces used for connection to the gNB and back haul. For high throughput workloads like UPF network function, it is recommended to use single root input/output (SR-IOV) pass through of the physical function (PF) or the virtual function (VF) as required. Also, in some cases, the simple switching capability in the NIC can be used to send traffic from one application to another as there is a direct path of communication required between the UPF and the Data plane this becomes an option. It should be noted the VF-to-VF option is only suitable when there is a direct connection between PODs on the same PF with no support for advanced switching. In this scenario it is advantageous to configure the UPF with three separate interfaces for the different types of traffic flowing in the system. This eliminates the need for additional traffic switching at the host. In this case there is a separate interface for N3 traffic to the Access Network, N9 and N4 traffic can share an interface to the backhaul network. While local data network traffic on the N6 can be switched directly to the local applications. Depending on performance requirements, a mix of data planes can be used on the platform to meet the varying requirements of the workloads. 

The applications are deployed on the same edge node as the UPF. Using CMK the applications can be deployed on the same CPU Socket or on separate CPU socket depending on the requirements. CPU pinning provides resource partitioning by pinning the workloads to specific CPU cores to ensure the low priority workloads don't interfere with the high priority NF workloads.

The use of Intel® Resource Director Technology (Intel® RDT) ensures the cache allocation and memory bandwidth are optimized for the workloads on running on the platform.

Intel® Speed Select Technology (Intel® SST) can be used to further enhance the performance of the platform.

The following EPA features are supported in OpenNESS

- <b>High-Density Deep Learning (HDDL)</b>: Software that enables OpenVINOâ„¢-based AI apps to run on Intel® Movidius Vision Processing Units (VPUs). It consists of the following components:
  - HDDL device plugin for K8s
  - HDDL service for scheduling jobs on VPUs
- <b>Visual Compute Acceleration - Analytics (VCAC-A)</b>: Software that enables OpenVINO-based AI apps and media apps to run on Intel® Visual Compute Accelerator Cards (Intel® VCA Cards). It is composed of the following components: 
  - VPU device plugin for K8s
  - HDDL service for scheduling jobs on VPU
  - GPU device plugin for K8s
- <b>FPGA/eASIC/NIC</b>: Software that enables AI inferencing for applications, high-performance and low-latency packet pre-processing on network cards, and offloading for network functions such as eNB/gNB offloading Forward Error Correction (FEC). It consists of: 
  - FPGA device plugin for inferencing
  - SR-IOV device plugin for FPGA/eASIC
  - Dynamic Device Profile for Network Interface Cards (NIC)
- <b>Resource Management Daemon (RMD)</b>: RMD uses Intel® Resource Director Technology (Intel® RDT) to implement cache allocation and memory bandwidth allocation to the application pods. This is a key technology for achieving resource isolation and determinism on a cloud-native platform. 
- <b>Node Feature Discovery (NFD)</b>: Software that enables node feature discovery for Kubernetes. It detects hardware features available on each node in a Kubernetes cluster and advertises those features using node labels. 
- <b>Topology Manager</b>: This component allows users to align their CPU and peripheral device allocations by NUMA node.
- <b>Kubevirt</b>: Provides support for running legacy applications in VM mode and the allocation of SR-IOV ethernet interfaces to VMs. 

#### CERA Near Edge Experience Kit Deployments
The CERA Near edge experience kits deploys both the near edge cluster and also a second cluster to host the 5GC control plane functions and provide an additional Data Network POD to act as public network for testing purposed. Note the Access network and UE simulators are not configured as part of the CERA Near Edge Experience Kit. Also required but not provided is a binary iUPF, UPF and 5GC components. Please contact local Intel® rep for more information. 

![CERA Experience Kit](cera-near-edge-images/cera-full-setup.png)

> Figure 7 - CERA Experience Kit

### Edge service applications supported on CERA Near Edge
The CERA architectural paradigm enables convergence of edge services and applications across different market segments. This is demonstrated by taking diverse workloads native to different segments and successfully integrating within a common platform. The reference considers workloads segments across the following applications:

Security: Capture of video and facilitating facial recognition to identified bona fide individuals to determine access to a security perimeter

Smart city: Capture of live camera streams to monitor and measure both pedestrian and vehicle movement within a zone.

Industrial: Monitoring of the manufacturing quality of an industrial line, the capture of video streams focused on manufactured devices on an assembly line and the real-time removal of identified defect parts

While these use cases are addressing completely different market segments, they all have similar requirements:

Capture video either from a live stream from a camera, or streamed from a recorded file.

Process that video using inference with a trained machine learning model, computer vision filters, etc.

Trigger business control logic based on the results of the video processing.

Video processing is inherently compute intensive and, in most cases, especially in edge processing, video processing becomes the bottleneck in user applications. This, ultimately, impacts service KPIs such as frames-per-second, number of parallel streams, latency, etc.

Therefore, pre-trained models, performing numerical precision conversions, offloading to video accelerators, heterogeneous processing and asynchronous execution across multiple types of processors all of which increase video throughput are extremely vital in edge video processing. However these requirements can significantly complicate software development, requiring expertise that is rare in engineering teams and increasing the time-to-market.

#### OpenVINO
The Intel® Distribution of OpenVINO toolkit helps developers and data scientists speed up computer vision workloads, streamline deep learning inference and deployments, and enable easy, heterogeneous execution across Intel® architecture platforms from edge to cloud. It helps to unleash deep learning inference using a common API, streamlining deep learning inference and deployment using standard or custom layers without the overhead of frameworks.

#### Edge Insights Software
Intel's Edge Insights for Industrial offers a validated solution to easily integrate customers' data, devices, and processes in manufacturing applications, which helps enable near-real-time intelligence at the edge, greater operational efficiency, and security in factories.
Intel's Edge Insights for Industrial takes advantage of modern microservices architecture. This approach helps OEMs, device manufacturers, and solution providers integrate data from sensor networks, operational sources, external providers, and industrial systems more rapidly. The modular, product-validated software enables the extraction of machine data at the edge. It also allows that data to be communicated securely across protocols and operating systems managed cohesively, and analyzed quickly.
Allowing machines to communicate interchangeably across different protocols and operating systems eases the process of data ingestion, analysis, storage, and management. Doing so also helps industrial companies build powerful analytics and machine learning models easily and generate actionable predictive insights at the edge.
Edge computing software deployments occupy a middle layer between the operating system and applications built upon it. Intel's Edge Insights for Industrial is created and optimized for Intel® architecture-based platforms and validated for underlying operating systems. Its capability supports multiple edge-critical Intel® hardware components like CPUs, FPGAs, accelerators, and Intel® Movidius Vision Processing Unit (VPU). Also, its modular architecture offers OEMs, solution providers, and ISVs the flexibility to pick and choose the features and capabilities they wish to include or expand upon for customized solutions. As a result, they can bring solutions to market fast and accelerate customer deployments.

For more about the supported EIS demos support see [EIS whitepaper](https://github.com/open-ness/edgeapps/blob/master/applications/eis-experience-kit/docs/whitepaper.md) 

### CERA Near Edge hardware platform
CERA is designed to run on standard, off-the-shelf servers with Intel® Xeon CPUs. Todays baseline requirements for servers are as follows:

Servers with Intel® Xeon Scalable processors or 2nd generation Intel® Xeon Scalable processors 

64 GB RAM recommended

At least 2x PCIe slots with Gen3 x8 or higher bandwidth

Much of Intel's development of the architecture has used rack-mount servers with a 20-core Intel® Xeon SP processor, 2 ports of at least 10 GbE connectivity, two solid state drives (SSD) of various capacities, and two full-height, full-length PCIe slots with x16 functionality.

See [Intel® Select Solutions](https://www.intel.com/content/www/us/en/products/docs/select-solutions/nfvi-forwarding-platform-brief.html) for more information.

#### Hardware acceleration
Based on deployment scenario and capacity requirements, there is the option to utilize hardware accelerators on the platform to increase performance of certain workloads. Hardware accelerators can be assigned to the relevant container on the platform through the OpenNESS Controller, enabling modular deployments to meet the desired use case.

AI acceleration
Video inference is done using the OpenVINO toolkit to accelerate the inference processing to identify people, vehicles or other items as needed. This is already optimized for software implementation and can be easily changed to utilize hardware acceleration if it is available on the platform.

Intel® Movidius Myriad X Vision Processing Unit (VPU) can be added to a server to provide a dedicated neural compute engine for accelerating deep learning inferencing at the edge. To take advantage of the performance of the neural compute engine, Intel® has developed the high-density deep learning (HDDL) inference engine plugin for inference of neural networks.

In the current example when the HDDL is enabled on the platform, the OpenVINO toolkit sample application reduces its CPU requirements from two cores to a single core. 

Note in future releases additional media analytics services will be enabled e.g VCAC-A card see for more info [OpenNESS VA Services](../applications/openness_va_services.md) 

### Data Flow
Both use cases scenarios involve traffic flowing in the uplink direction from the access network. The traffic depends on the use case - could be video traffic from industrial camera inspecting conveyor belt as per EIS demo or traffic/pedestrian video as per OpenVINO demo. The below diagram shows the high level flow from an input video stream from a mobile device sent over the access network and processed by the OpenVINO toolkit sample application for inference. There are two types of traffic: one that is classified and sent to public cloud (green), and the other which is classified as video traffic and sent to the local data network where it is routed to OpenVINO toolkit sample application for inference and processing. Routing and classification is configured through the OpenNESS controller and CNCA micro service which request via AMF  to update the UL classification rules of the UPF and also the routing in the data plane. 

![CERA Near Edge Data flow](cera-near-edge-images/cera-data-flow.png)

> Figure 8 - CERA Near Edge Data flow


### CERA Near Edge OpenNESS deployment

#### Setting up target platform before deployment

Steps to be performed on the target machine before deployment

1. Ensure that, the target machine gets IP address automatically on boot every time.  
Example command:  
`hostname -I`

2. Change target machine's hostname.
  * Edit file `vi /etc/hostname`. Press `Insert` key to enter Insert mode. Delete the old hostname and replace it with the new one. Exit the vi editor by pressing `Esc` key and then type `:wq` and press `Enter` key.
  * Edit file `vi /etc/hosts`. Press `Insert` key to enter Insert mode. Add a space at the end of both lines and write hostname after it. Exit the vi editor by pressing `Esc` key and then type `:wq` and press `Enter` key.

3. Reboot the target machine.

### BIOS Setup
There are two possibilities to change BIOS settings. The most important parameters to be set are:
* Disable Intel® Hyper-Threading Technology
* Enable Intel® Virtualization Technology
* Enable Intel® Virtualization Technology for Directed I/O
* Enable SR-IOV Support

#### Manual setup
Reboot platform, go to the BIOS setup during server boot process and set correct options.

#### Setup through the CERA deployment
Bios will be set automatically during CERA deployment according to the provided settings. 
* Provide correct `bios_settings.ini` file for `Intel SYSCFG utility` and store it in `ido-converged-edge-experience-kits/roles/bios_setup/files/`
* Set correct name of variable `biosconfig_local_path` in file: `ido-converged-edge-experience-kits/cera_5g_near_edge_deployment.yml` for both hosts.
    ```yaml
    # NE Server
    - role: bios_setup
      vars:
        biosconfig_local_path: "bios_config_cera_5g_ne.ini"
      when: update_bios_ne | default(False)
    ```
    ```yaml
    # CN Server
    - role: bios_setup
      vars:
        biosconfig_local_path: "bios_config_cera_5g_cn.ini"
      when: update_bios_cn | default(False)
    ```
* Change variable to `True` in `ido-converged-edge-experience-kits/host_vars/cera_5g_cn.yml` and  in `ido-converged-edge-experience-kits/host_vars/cera_5g_ne.yml`

  ```yaml
  # Set True for bios update
  update_bios_cn: True
  ```
  ```yaml
  # Set True for bios update
  update_bios_ne: True
  ```
> NOTE: It's important to have correct bios.ini file with settings generated on the particular server. There are some unique serial numbers assigned to the server.

More information: [BIOS and Firmware Configuration on OpenNESS Platform](https://www.openness.org/docs/doc/enhanced-platform-awareness/openness-bios)

### Setting up machine with Ansible

#### Steps to be performed on the machine, where the Ansible playbook is going to be run

1. Copy SSH key from machine, where the Ansible playbook is going to be run, to the target machine. Example commands:
    > NOTE: Generate ssh key if is not present on the machine: `ssh-keygen -t rsa` (Press enter key to apply default values)

    Do it for each target machine
    ```shell
    ssh-copy-id root@TARGET_IP
    ```
    > NOTE: Replace TARGET_IP with the actual IP address of the target machine.

2. Clone `ido-converged-edge-experience-kits` repo from `github.com/open-ness` using git token.
    ```shell
    git clone --recursive GIT_TOKEN@github.com:open-ness/ido-converged-edge-experience-kits.git
    ```
    > NOTE: Replace GIT_TOKEN with your git token.

3. Update repositories by running following commands.
    ```shell
    cd ido-converged-edge-experience-kits
    git submodule foreach --recursive git checkout master
    git submodule update --init --recursive
    ```

4. Provide target machines IP addresses for OpenNESS deployment in `ido-converged-edge-experience-kits/openness_inventory.ini`. For Singlenode setup, set the same IP address for both `controller` and `node01`, the line with `node02` should be commented by adding # at the beginning.  
Example:
    ```ini
    [all]
    controller ansible_ssh_user=root ansible_host=192.168.1.43 # First server NE
    node01 ansible_ssh_user=root ansible_host=192.168.1.43 # First server NE
    ; node02 ansible_ssh_user=root ansible_host=192.168.1.12
    ```
    At that stage provide IP address only for `CERA 5G NE` server.

5. Edit `ido-converged-edge-experience-kits/openness/group_vars/all/10-open.yml` and provide some correct settings for deployment.  

    Git token.
    ```yaml
    git_repo_token: "your git token"
    ```
    Proxy if is required.
    ```yaml
    # Setup proxy on the machine - required if the Internet is accessible via proxy
    proxy_enable: true
    # Clear previous proxy settings
    proxy_remove_old: true
    # Proxy URLs to be used for HTTP, HTTPS and FTP
    proxy_http: "http://proxy.example.org:3128"
    proxy_https: "http://proxy.example.org:3129"
    proxy_ftp: "http://proxy.example.org:3129"
    # Proxy to be used by YUM (/etc/yum.conf)
    proxy_yum: "{{ proxy_http }}"
    # No proxy setting contains addresses and networks that should not be accessed using proxy (e.g. local network, Kubernetes CNI networks)
    proxy_noproxy: "127.0.0.1,localhost,192.168.1.0/24"
    ```
    NTP server
    ```yaml
    ### Network Time Protocol (NTP)
    # Enable machine's time synchronization with NTP server
    ntp_enable: true
    # Servers to be used by NTP instead of the default ones (e.g. 0.centos.pool.ntp.org)
    ntp_servers: ['ger.corp.intel.com']
    ```

6. Edit file `ido-converged-edge-experience-kits/openness/flavors/cera_5g_near_edge/edgenode_group.yml` and provide correct CPU settings.

    ```yaml
    tuned_vars: |
      isolated_cores=1-16,25-40
      nohz=on
      nohz_full=1-16,25-40
    # CPUs to be isolated (for RT procesess)
    cpu_isol: "1-16,25-40"
    # CPUs not to be isolate (for non-RT processes) - minimum of two OS cores necessary for controller
    cpu_os: "0,17-23,24,41-47"
    ```

7. Edit file `ido-converged-edge-experience-kits/openness/flavors/cera_5g_near_edge/controller_group.yml` and provide names of `network interfaces` that are connected to second server and number of VF's to be created.

    ```yaml
    sriov:
      network_interfaces: {eno1: 5, eno2: 2}
    ```
    > NOTE: On various platform interfaces can have different name. For e.g `eth1` instead of `eno1`. Please verify interface name before deployment and do right changes.

8. Execute the `deploy_openness_for_cera.sh` script in `ido-converged-edge-experience-kits` to start OpenNESS platform deployment process by running following command:
    ```shell
    ./deploy_openness_for_cera.sh cera_5g_near_edge
    ```
    It might take few hours.

9. After successful OpenNESS deployment, edit again `ido-converged-edge-experience-kits/openness_inventory.ini`, change IP address to `CERA 5G CN` server.
    ```ini
    [all]
    controller ansible_ssh_user=root ansible_host=192.168.1.109 # Second server CN
    node01 ansible_ssh_user=root ansible_host=192.168.1.109 # Second server CN
    ; node02 ansible_ssh_user=root ansible_host=192.168.1.12
    ```
    Then run `deploy_openness_for_cera.sh` again.
    ```shell
    ./deploy_openness_for_cera.sh 
    ```
    All settings in `ido-converged-edge-experience-kits/openness/group_vars/all/10-open.yml` are the same for both servers.

10. When both servers have deployed OpenNess, login to `CERA 5G CN` server and generate `RSA ssh key`. It's required for AMF/SMF VM deployment.
    ```shell
    ssh-keygen -t rsa
    # Press enter key to apply default values
    ```
11. Now full setup is ready for CERA deployment.

### CERA Near Edge Experience Kit Deployment
For CERA deployment some prerequisites have to be fulfilled. 

1. CentOS should use kernel `kernel-3.10.0-957.el7.x86_64` and have no newer kernels installed.

2. Edit file `ido-converged-edge-experience-kits/group_vars/all.yml` and provide correct settings:

    Git token
    ```yaml
    git_repo_token: "your git token"
    ```
    Decide which demo application should be launched
    ```yaml
    # choose which demo will be launched: `eis` or `openvino`
    deploy_app: "eis"
    ```
    EIS release package location
    ```yaml
    # provide EIS release package archive absolute path
    eis_release_package_path: ""
    ```
    AMF/SMF VM image location
    ```yaml
    # VM image path
    vm_image_path: "/opt/flexcore-5g-rel/ubuntu_18.04.qcow2"
    ```

3. Edit file `ido-converged-edge-experience-kits/host_vars/localhost.yml` and provide correct proxy if is required.

    ```yaml
    ### Proxy settings
    # Setup proxy on the machine - required if the Internet is accessible via proxy
    proxy_os_enable: true
    # Clear previous proxy settings
    proxy_os_remove_old: true
    # Proxy URLs to be used for HTTP, HTTPS and FTP
    proxy_os_http: "http://proxy.example.org:3129"
    proxy_os_https: "http://proxy.example.org:3128"
    proxy_os_ftp: "http://proxy.example.org:3128"
    proxy_os_noproxy: "127.0.0.1,localhost,192.168.1.0/24"
    # Proxy to be used by YUM (/etc/yum.conf)
    proxy_yum_url: "{{ proxy_os_http }}"
    ```

4. Build all docker images required and provide all necessary binaries.
    - [dUPF](#dUPF)
    - [UPF](#UPF)
    - [AMF-SMF](#AMF-SMF)
5. Set all necessary settings for `CERA 5G NE` in `ido-converged-edge-experience-kits/host_vars/cera_5g_ne.yml`.  
    See [more details](#dUPF) for dUPF configuration
    ```yaml
    # Define PCI addresses (xxxx:xx:xx.x format) for i-upf
    n3_pci_bus_address: "0000:3d:06.0"
    n4_n9_pci_bus_address: "0000:3d:02.0"
    n6_pci_bus_address: "0000:3d:02.1"

    # Define VPP VF interface names for i-upf
    n3_vf_interface_name: "VirtualFunctionEthernet3d/6/0"
    n4_n9_vf_interface_name: "VirtualFunctionEthernet3d/2/0"
    n6_vf_interface_name: "VirtualFunctionEthernet3d/2/1"
    ```
    ```yaml
    # Define path where i-upf is located on remote host
    upf_binaries_path: "/opt/flexcore-5g-rel/i-upf/"
    ```
    ```yaml
    # PF interface name of N3 created VF
    host_if_name_N3: "eno1"
    # PF interface name of N4, N6, N9 created VFs
    host_if_name_N4_N6_n9: "eno2"
    ```
    [OpenVino](#OpenVINO) settings if was set as active demo application
    ```yaml
    model: "pedestrian-detection-adas-0002"
    display_host_ip: "" # update ip for visualizer HOST GUI.
    save_video: "enable"
    target_device: "CPU"
    ```
7. Set all necessary settings for `CERA 5G CN` in `ido-converged-edge-experience-kits/host_vars/cera_5g_cn.yml`.  
    For more details check:
    - [UPF](#UPF)
    - [AMF-SMF](#AMF-SMF)
    ```yaml
    # Define N4/N9 and N6 interface device PCI bus address
    PCI_bus_address_N4_N9: '0000:3d:02.0'
    PCI_bus_address_N6: '0000:3d:02.1'

    # vpp interface name as per setup connection
    vpp_interface_N4_N9_name: 'VirtualFunctionEthernet3d/2/0'
    vpp_interface_N6_name: 'VirtualFunctionEthernet3d/2/1'
    ```
    ```yaml
    # 5gc binaries directory name
    package_name_5gc: "5gc"
    ```
    ```yaml
    # psa-upf directory path
    upf_binaries_path: '/opt/flexcore-5g-rel/psa-upf/'
    ```
    ```yaml
    ## AMF-SMF vars

    # Define N2/N4
    PCI_bus_address_N2_N4: "0000:3d:02.3"
    ```
    `CERA 5G CN` public ssh key
    ```yaml
    # Host public ssh key 
    host_ssh_key: ""
    ```
    ```yaml
    ## ConfigMap vars

    # PF interface name of N3 created VF
    host_if_name_N3: "eno2"
    # PF interface name of N4, N6, N9 created VFs
    host_if_name_N4_N6_n9: "eno1"
    ```
8. Provide correct IP for target servers in file `ido-converged-edge-experience-kits/cera_inventory.ini`
    ```ini
    [all]
    cera_5g_ne ansible_ssh_user=root ansible_host=192.168.1.109
    cera_5g_cn ansible_ssh_user=root ansible_host=192.168.1.43
    ```
9. Deploy CERA Experience Kit
    ```shell
    ./deploy_cera.sh
    ```

## 5G Core Components
This section describes in details how to build particular images and configure ansible for deployment.

### dUPF

#### Overview

The Distributed User Plane Function (dUPF) is a part of 5G Access Network, it is responsible for packets routing. It has 3 separate interfaces for `N3, N4/N9` and `N6` data lines. `N3` interface is used for connection with video stream source. `N4/N9` interface is used for connection with `UPF` and `AMF/SMF`. `N6` interface is used for connection with `EDGE-APP` (locally), `UPF` and `Remote-DN`

The `CERA dUPF` component is deployed on `CERA 5G Near Edge (cera_5g_ne)` node. It is deployed as a POD - during deployment of OpenNESS with CERA 5G Near Edge flavor automatically.

#### Deployment

#### Prerequisites

To deploy dUPF correctly it is needed to provide Docker image to Docker repository on target machine(cera_5g_ne). There is a script on the `open-ness/eddgeapps/network-functions/core-network/5G/UPF` repo provided by CERA, which builds the image automatically.

#### Settings
Following variables need to be defined in `/host_vars/cera_5g_ne.yml`
```yaml
n3_pci_bus_address: "" - PCI bus address of VF, which is used for N3 interface by dUPF
n4_n9_pci_bus_address: "" - PCI bus address of VF, which is used for N4 and N9 interface by dUPF
n6_pci_bus_address: "" - PCI bus address of VF, which is used for N6 interface by dUPF

n3_vf_interface_name: "" - name of VF, which is used for N3 interface by dUPF
n4_n9_vf_interface_name: "" - name of VF, which is used for N4 and N9 interface by dUPF
n6_vf_interface_name: "" - name of VF, which is used for N6 interface by dUPF

dpdk_driver_upf: "" - DPDK driver used (vfio-pci/igb_uio) to VFs bindings

upf_binaries_path: "" - path where the dUPF binaries are located on the remote host
```

#### Configuration
The dUPF is configured automatically during the deployment.

### UPF
#### Overview

The `User Plane Function (UPF)` is a part of 5G Core Network, it is responsible for packets routing. It has 2 separate interfaces for `N4/N9` and `N6` data lines. `N4/N9` interface is used for connection with `dUPF` and `AMF/SMF` (locally). `N6` interface is used for connection with `EDGE-APP`, `dUPF` and `Remote-DN` (locally).

The CERA UPF component is deployed on `CERA 5G Core Network (cera_5g_cn)` node. It is deployed as a POD - during deployment of OpenNESS with CERA 5G Near Edge flavor automatically.

#### Deployment

#### Prerequisites

To deploy UPF correctly it is needed to provide a Docker image to Docker Repository on target machine(cera_5g_ne and cera_5g_cn). There is a script on the `open-ness/eddgeapps/network-functions/core-network/5G/UPF` repo provided by CERA, which builds the image automatically.

#### Settings

Following variables need to be defined in the `/host_vars/cera_5g_ne.yml`
```yaml
PCI_bus_address_N4_N9: "" - PCI bus address of VF, which is used for N4 and N9 interface by UPF
PCI_bus_address_N6: "" - PCI bus address of VF, which is used for N6 interface by UPF

vpp_interface_N4_N9_name: "" - name of VF, which is used for N4 and N9 interface by UPF
vpp_interface_N6_name: "" - name of VF, which is used for N6 interface by UPF

dpdk_driver_upf: "" - DPDK driver used (vfio-pci/igb_uio) to VFs bindings

upf_binaries_path: "" - path where the UPF binaries are located on the remote host
```

#### Configuration
The UPF is configured automatically during the deployment.


### AMF-SMF
#### Overview

AMF-SMF is a part of 5G Core Architecture responsible for `Session Management(SMF)` and `Access and Mobility Management(AMF)` Functions - it establishes sessions and manages date plane packages.

The CERA `AMF-SMF` component is deployed on `CERA 5G Core Network (cera_5g_cn)` node and communicates with UPF and dUPF, so they must be deployed and configured before `AMF-SMF`.

It is deployed in Virtual Machine with `Ubuntu 18.04 Cloud OS`, using `Kube-virt` on OpenNess platform - deploying OpenNess with CERA 5G Near Edge flavor automatically, configures and enables Kube-Virt plugin in OpenNess platform.

#### Deployment
#### Prerequisites

To deploy `AMF-SMF` correctly it is needed to provide image with `Ubuntu 18.04.1 Desktop (.img, .qcow2 format)` with required packages installed and directory with `AMF-SMF` binaries.

#### Settings

Following variables need to be defined in `/host_vars/cera_5g_cn.yml`
```yaml
PCI_bus_address_N2_N4: "" - PCI Bus address for VF (e.g. 0000:3a:01), which will be used for N2 and N4 interface by AMF-SMF (VF created from the same interface like Remote-DN and dUPF).

host_ssh_key: "" - public ssh key of node - to generate public ssh key, please use on node command: ssh-keygen -t rsa and copy content of file located in $HOME/.ssh/id_rsa.pub (without ssh-rsa on beginning and user@hostname at the end) to variable.

host_user_name: "" - username (e.g. root) of the node.

And one variable in /group_vars/all.yml

vm_image_path: "" - path where image of Virtual Machine (provided from script described above) is stored on host machine.
```

#### Configuration
During the deployment, there is a Python script, which automatically configure `SMF` config files according to CERA setup. It changes IP subnet for `Local-DN` component in `AMF-SMF` configuration files. These settings can be changed manually if it is needed by User Setup.

#### How to prepare image
Steps to do on host machine with CentOS

1. Download Ubuntu 18.04.1 Desktop `.iso` image.
   ```shell
   wget http://old-releases.ubuntu.com/releases/18.04.1/ubuntu-18.04.1-desktop-amd64.iso
   ```
2. Check that `kvm_intel` is enabled in BIOS settings.
   ```shell
   dmesg | grep kvm       -> should not display any disabled msg
   lsmod | egrep 'kvm'
   kvm_intel             183818  0
   kvm                   624312  1 kvm_intel           ->if BIOS VM enabled then kvm_intel should appear
   irqbypass              13503  1 kvm
   ```
3. Enable VNC Server and install GNOME Desktop.
   ```shell
   yum groupinstall "GNOME Desktop"
   yum install tigervnc-server xorg-x11-fonts-Type1
   vncserver -depth 24 -geometry 1920x1080
   ```
4. Install Hypervisor packages and libraries.
   ```shell
   yum install qemu-kvm libvirt libvirt-python libguestfs-tools virt-install virt-manager
   systemctl start libvirtd
   ```
5. RUN `virt-manager` GUI application, select previous downloaded Ubuntu `.iso` image and the disk size (20GiB recommended) and follow the install process. After successful install take the next steps.
6. Change the grub file on Guest OS to allow console connection.
   ```shell
   vi /etc/default/grub
   Add `console=ttyS0` to end of `GRUB_CMD_LINELINUX=`
   ```
   Execute.
   ```shell
   grub-mkconfig -o /boot/grub/grub.cfg
   Reboot board..
   ```
7. Login to Guest OS using `virsh console`.
   ```shell
   virsh console <NAME_OF_VM>
   ```
   > NOTE: Replace <NAME_OF_VM> with the Virtual Machine name with Ubuntu OS 

Steps to do on logged Guest OS

1. Enable Ping utility.
   ```shell
   sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
   ```
   Verify that content of `etc/reslov.conf` is the same like in `/run/systemd/resolve/resolv.conf`
   Test utility by pinging other server in the same network
   ```shell
   ping -c 5 <SERVER_IP>
   ```
   > NOTE: Replace <SERVER_IP> with any other server on the same network
2. Add proxy to environment variables.
   ```shell
   vi /etc/environment
   http_proxy="http://proxy.example.org:3128"
   https_proxy="http://proxy.example.org:3129"
   no_proxy="127.0.0.1,localhost,192.168.1.0/24"
   ```
3. Reboot Guest.
   ```shell
   reboot
   ```
4. After reboot log in again using `virsh console` from host machine.
5. Update package repositories.
   ```shell
   apt-get update
   ```
6. Install SSH Server and check status.
   ```shell
   apt-get install openssh-server
   systemctl status ssh
   ```
7. Permit SSH connection as a root user.
   Change settings in SSH config file:
   ```shell
   vi /etc/ssh/sshd_config
   PermitRootLogin yes
   ```
   And restart SSH Server Daemon.
   ```shell
   service sshd restart
   ```
8. Install required packages for AMF-SMF deployment.
   ```shell
   apt-get install -y screen iproute2 net-tools cloud-init
   ```
9. Copy AMF-SMF binaries to root HOME folder.
10. Shutdown the Guest Machine.

After these steps there will be available `.qcow2` image generated by installed Virtual Machine in `/var/lib/libvirt/images` directory.

If AMF-SMF is not working correctly installing these packages should fix it: `qemu-guest-agent,iputils-ping,iproute2,screen,libpcap-dev,tcpdump,libsctp-dev,apache2,python-pip,sudo,ssh`.

### Remote-DN

#### Overview
Remote Data Network is component, which represents `“internet”` in networking. CERA Core Network manages which data should apply to `Near Edge Application(EIS/OpenVINO)` or go further to the network.


#### Prerequisites
Deployment of Remote-DN is completely automated, so there is no need to set or configure anything.


### Local-DN
#### Overview
Local Data Network is component, which is responsible for combining Core part with Edge applications. It can convert incoming video streaming protocol for acceptable format by EIS/OpenVino


#### Prerequisites
Deployment of Local-DN is completely automated, so there is no need to set or configure anything.

### OpenVINO

#### Settings
In the `group_vars/all.yml` file can be chosen which application should be built and deploy. Set a proper value for the deploy_app variable.
```yaml
deploy_app: "" - Type openvino if OpenVINO demo should be launched.
```

Several variables must be set in the file `host_vars/cera_5g_ne.yml`:
```yaml
model: "pedestrian-detection-adas-0002" - Model for which the OpenVINO demo will be run. Models which can be selected: pedestrian-detection-adas-0002, pedestrian-detection-adas-binary-0001, pedestrian-and-vehicle-detector-adas-0001, vehicle-detection-adas-0002, vehicle-detection-adas-binary-0001, person-vehicle-bike-detection-crossroad-0078, person-vehicle-bike-detection-crossroad-1016, person-reidentification-retail-0031, person-reidentification-retail-0248, person-reidentification-retail-0249, person-reidentification-retail-0300, road-segmentation-adas-0001

save_video: "enable" - For value "enable" the output will be written to /root/saved_video/ov-output.mjpeg file on cera_5g_ne machine. This variable should not be changed.
```

#### Deployment
After running the `deploy_cera.sh` script, pod ov-openvino should be available on `cera_5g_ne` machine. The status of the ov-openvino pod can be checked by use:
```shell
kubectl get nodes,pods,svc -A -o wide|grep ov-openvino
```
Immediately after creating, the ov-openvino pod will wait for input streaming. If streaming is not available, ov-openvino pod will restart after some time. After this restart, this pod will wait for streaming again.

#### Streaming
Video to OpenVINO pod should be streamed to IP `192.168.1.101` and port `5000`. Make sure that the pod with OpenVINO is visible from yours streaming machine. In the simplest case, the video can be streamed from the same machine where pod with OpenVINO is available.

Output will be saved to the `saved_video/ov-output.mjpeg` file (`save_video` variable in the `host_vars/cera_5g_ne.yml` should be set to `"enable"` and should be not changed).

Streaming is possible from a file or from a camera. For continuous and uninterrupted streaming of a video file, the video file can be streamed in a loop. An example of a Bash file for streaming is shown below.
```shell
#!/usr/bin/env bash
while :
do
  ffmpeg -re -i Rainy_Street.mp4 -pix_fmt yuvj420p -vcodec mjpeg \
    -huffman 0 -map 0:0 -pkt_size 1200 -f rtp rtp://192.168.1.101:5000
done
```
Where:
* `ffmpeg` - Streaming software must be installed on the streaming machine.
* `Rainy_Street.mp4` - The file that will be streamed. This file can be downloaded by: 
    ```shell 
    wget https://storage.googleapis.com/coverr-main/zip/Rainy_Street.zip
    ```

The OpenVINO demo, saves its output to saved_video/ov-output.mjpeg file on the cera_5g_cn machine.

- To stop the OpenVINO demo and interrupt creating the output video file - run on the cera_5g_cn: kubectl delete -f /opt/openvino/yamls/openvino.yaml
- To start the OpenVINO demo and start creating the output video file (use this command if ov-openvino pod does not exist) - run on the cera_5g_cn: kubectl apply -f /opt/openvino/yamls/openvino.yaml

### EIS
Deployment of EIS is completely automated, so there is no need to set or configure anything except providing release package archive.
```yaml
# provide EIS release package archive absolute path
eis_release_package_path: ""
```

For more details about `eis-experience-kit` check [README.md](https://github.com/open-ness/edgeapps/blob/master/applications/eis-experience-kit/README.md)

## Conclusion
CERA Near Edge deployment provide a reference implementation on how to use OpenNESS software to efficiently deploy, manage and optimize the performance of network functions and applications suited to running at the Near Edge Network. With the power of Intel® architecture CPUs and the flexibility to add hardware accelerators, CERA systems can be customized for a wide range of applications. 

## Learn more
* [Building on NFVI foundation from Core to Cloud to Edge with Intel® Architecture](https://networkbuilders.intel.com/social-hub/video/building-on-nfvi-foundation-from-core-to-cloud-to-edge-with-intel-architecture)
* [Edge Software Hub](https://software.intel.com/content/www/us/en/develop/topics/iot/edge-solutions.html)
* [Solution Brief: Converged Edge Reference Architecture (CERA) for On-Premise/Outdoor](https://networkbuilders.intel.com/solutionslibrary/converged-edge-reference-architecture-cera-for-on-premise-outdoor#.XffY5ut7kfI)

## Acronyms

|             |                                                               |
|-------------|---------------------------------------------------------------|
| AI          | Artificial intelligence                                       |
| AN          | Access Network                                                |
| CERA        | Converged Edge Reference Architecture                         |
| CN          | Core Network                                                  |
| CNF         | Container Network Function                                    |
| CommSPs     | Communications service providers                              |
| DPDK        | Data Plane Developer Kit                                      |
| eNB         | e-NodeB                                                       |
| EPA         | Enhance Platform Awareness                                    |
| EPC         | Extended Packet Core                                          |
| FPGA        | Field programmable gate array                                 |
| IPSEC       | Internet Protocol Security                                    |
| MEC         | Multi-access edge computing                                   |
| OpenNESS    | Open Network Edge Services Software                           |
| OpenVINO    | Open visual inference and neural network optimization         |
| OpenVX      | Open Vision Acceleration                                      |
| OVS         | Open Virtual Switch                                           |
| PF          | Physical function                                             |
| RAN         | Radio Access Network                                          |
| SD-WAN      | Software defined wide area network                            |
| uCPE        | Universal customer premises equipment                         |
| UE          | User Equipment                                                |
| VF          | Virtual function                                              |
| VM          | Virtual Machine                                               |
