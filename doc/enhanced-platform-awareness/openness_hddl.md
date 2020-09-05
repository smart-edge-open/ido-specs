```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2019 Intel Corporation
```
<!-- omit in toc -->
<!-- use an approved noun after Intel® Movidius™ Myriad™ X. See namesdb.intel.com -->
# Using Intel® Movidius™ Myriad™ X High Density Deep Learning (HDDL) solution in OpenNESS
- [Overview](#overview)
- [HDDL Introduction](#hddl-introduction)
- [HDDL OpenNESS Integration](#hddl-openness-integration)
  - [Dynamic CPU and VPU usage](#dynamic-cpu-and-vpu-usage)
- [Summary](#summary)
- [Reference](#reference)
<!-- remove the following from the TOC:
- [Using HDDL-R PCI card with OpenNESS - Details](#using-hddl-r-pci-card-with-openness---details)
  - [Building Docker image with HDDL only or dynamic CPU/VPU usage](#building-docker-image-with-hddl-only-or-dynamic-cpuvpu-usage)
  - [Deploying application with HDDL support](#deploying-application-with-hddl-support)
-->

## Overview
The deployment of AI-based, machine-learning (ML) applications on the edge have become more prevalent. Supporting hardware resources that accelerate AI/ML applications on the edge is key to improve the capacity of edge cloud deployment. It is also important to use the CPU instruction set to execute AI/ML tasks when a workload is less. This document explains these topics in the context of inference as an edge workload.
<!-- when a workload is less what? --> 
## HDDL Introduction
Intel® Movidius™ Myriad™ X High Density Deep Learning (HDDL) solution integrates multiple Intel® Movidius™ Myriad™ X brand SoCs in a PCIe add-in card form factor or a module form factor to build a scalable, high-capacity, deep-learning solution. It provides hardware and software reference for customers. The following figure shows the HDDL-R concept.
<!-- HDDL-R? --> 
![HDDL-R Add-in Card](hddl-images/openness_HDDL.png)

- <b>HDDL-R</b>: Raw video data to the PCIe card (decode on the host).
- <b>Scalability</b>: Options available to put between 4 to 8 Intel® Movidius™ Myriad™ X brand SoC chips in one add-in-card.
- <b>Easy to adopt (plug and use)</b>: Powered by the PCIe\* x4 interface with a 25W ceiling from existing NVR and server designs.
<!-- NVR? IE APIs? IE HDDL? HAL API? IE HDDL?--> 
The HDDL SW stack adopts OpenVINO™ brand IE APIs. These universal deep-learning inference APIs have different implementations for the Intel’s CPU, GPU, FPGA, and VPU (Intel® Movidius™ Myriad™ series) technology.
Each implementation for each hardware is an inference engine plugin.
The plugin for the Intel® Movidius™ Myriad™ X HDDL solution, or IE HDDL plugin for short, supports the Intel® Movidius™ Myriad™ X HDDL Solution hardware PCIe card. It communicates with the Intel® Movidius™ Myriad™ X HDDL HAL API to manage multiple Intel® Movidius™ Myriad™ X devices in the card, and it schedules deep-learning neural networks and inference tasks to these devices.

## HDDL OpenNESS Integration

OpenNESS provides support for the deployment of OpenVINO™ applications and workloads accelerated through Intel® Vision Accelerator Design with the Intel® Movidius™ VPU HDDL-R add-in card. As a prerequisite for enabling the support, it is required for the HDDL add-in card to be inserted into the PCI slot of the Edge Node platform. The support is then enabled by setting the appropriate flag in a configuration file before deployment of the Edge Node software toolkit.

With a correct configuration during the Edge Node bring up, an automated script will install all components necessary, such as kernel drivers required for the correct operation of the Vision Processing Units (VPUs) and 'udev rules' required for correct kernel driver assignment and booting of these devices on the Edge Node host platform.

After the OpenNESS automated script installs all necessary tools and components for Edge Node bring up, another automated script responsible for deployment of all micro-services is run. As part of this particular script, a Docker\* container running a 'hddl-service' is started if the option for HDDL support is enabled. This container, which is part of OpenNESS system services, is a privileged container with 'SYS_ADMIN' capabilities and access to the host’s devices.

The 'hddl-service' container is running the HDDL Daemon which is responsible for bringing up the HDDL Service within the container. The HDDL Service enables the communication between the OpenVino™ applications required to run inference on HDDL devices and VPUs needed to run the workload. This communication is done via a socket, which is created by the HDDL service. The default location of the socket is the `/var/tmp/`directory of the Edge Node host. The application container requiring HDDL acceleration needs to be exposed to this socket.

![HDDL-Block-Diagram](hddl-images/hddlservice.png)

Regarding the application deployment sample, Dockerfiles with instructions on how to build Docker images are provided by OpenNESS. Instructions on how to deploy Edge Applications and Services are out of scope for this document. There are two applications for OpenVINO™ sample deployment on the Edge Node provided. The first application is an OpenVINO™ application that runs inference on a video stream received by the application container. The second application is a Producer application that services the first (OpenVINO™) application via push notifications using the EAA service of OpenNESS. The Producer application periodically notifies the OpenVino™ application container to change the inference model or the OpenVino™ plugin to use.
The producer application container image can be built with an option to either constantly run the inference on HDDL VPUs or periodically change between CPU and HDDL workloads.

From the perspective of applications built to use HDDL acceleration for inference, users are required to complete additional steps during application deployment, as compared to inference run on a CPU. The user needs to provide a feature key as part of the application onboarding, which will enable the use of HDDL by the application. The application container needs access to the 'hddl-service' socket and 'ion' device from the host to communicate with the HDDL service. If during the bring up of the Edge Node, the HDDL service was properly configured and the application was deployed with appropriate EPA flag, these resources are automatically allocated to the application container by the OpenNESS EVA microservice.
<!—EVA? EPA? -->
### Dynamic CPU and VPU usage
OpenNESS demonstrates one more great applicability: Edge compute and efficient resource utilization in the Edge cloud. The OpenVINO™ sample application supports the dynamic use of VPU or CPU for object detection depending on the input from the Producer application. The Producer application can behave as a load balancer. It also demonstrates the application portability with OpenVINO™, enabling it to run on CPU or VPU.

![HDDL-R Add-in Card](hddl-images/openness_dynamic.png)

## Summary
The Intel® Movidius™ Myriad™ X HDDL solution integrates multiple Intel® Movidius™ Myriad™ X brand SoCs in a PCIe add-in card form factor or a module form factor to build a scalable, high-capacity, deep-learning solution. OpenNESS provides a toolkit for customers to put together deep-learning solutions at the edge. To take it further for efficient resource usage, OpenNESS provides a mechanism to use CPU or VPU depending on the load or any other criteria.

## Reference
- [HDDL-R: Mouser Mustang-V100](https://www.mouser.ie/datasheet/2/763/Mustang-V100_brochure-1526472.pdf)
