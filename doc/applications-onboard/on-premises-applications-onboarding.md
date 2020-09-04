```text
SPDX-License-Identifier: Apache-2.0
Copyright (c) 2019 Intel Corporation
```
<!-- omit in toc -->
# On-Premises Edge Applications Onboarding
- [Introduction](#introduction)
  - [Instructions to setup HTTPD server for images](#instructions-to-setup-httpd-server-for-images)
    - [Automatic deployment](#automatic-deployment)
    - [Manual instructions](#manual-instructions)
    - [Instruction to generate certificate for a domain](#instruction-to-generate-certificate-for-a-domain)
    - [Instruction to upload and access images](#instruction-to-upload-and-access-images)
    - [Instruction to create Traffic Policy and assign it to Interface](#instruction-to-create-traffic-policy-and-assign-it-to-interface)
      - [Creating Traffic Policy](#creating-traffic-policy)
      - [Adding Traffic Policy to Interface](#adding-traffic-policy-to-interface)
- [Building applications](#building-applications)
  - [Building the OpenVINO application images](#building-the-openvino-application-images)
- [Onboarding applications](#onboarding-applications)
  - [Onboarding container / VM application](#onboarding-container--vm-application)
    - [Prerequisites](#prerequisites)
    - [Creating application](#creating-application)
    - [Deploying application steps](#deploying-application-steps)
  - [Onboarding OpenVINO applications](#onboarding-openvino-applications)
    - [Prerequisites](#prerequisites-1)
    - [Setting up Network Interfaces](#setting-up-network-interfaces)
    - [Starting traffic from Client Simulator](#starting-traffic-from-client-simulator)

# Introduction
This document familiarizes users with the OpenNESS application on-boarding process for the on-premises mode. This document also provides instructions on: 
* How to deploy an application from the Edge Controller on Edge Nodes
* Sample deployment scenarios and traffic configuration for the application
The applications will be deployed from the Edge Controller UI webservice.

## Instructions to setup HTTPD server for images

### Automatic deployment

Apache\* server is automatically deployed to the Edge Controller machine during on-premises deployment.

### Manual instructions

1. Install apache and mod_ssl:
```
 yum -y install httpd mod_ssl
```
2. Navigate to `/etc/ssl/certs`:
```
cd /etc/ssl/certs
```
3. Acquire the controller root ca and key:
```
docker cp edgecontroller_cce_1:/artifacts/certificates/ca/cert.pem .
docker cp edgecontroller_cce_1:/artifacts/certificates/ca/key.pem .
```
4. Generate the Apache key and crt for IP address:
```
openssl genrsa -out apache.key 2048
openssl req -new -key apache.key -out apache.csr
```
5. Edit `/etc/pki/tls/openssl.cnf` and add:
```
[ req_ext ]
subjectAltName=IP:<your_ip_address>
```
6. Generate the Apache certificate:
```
openssl x509 -req -in apache.csr -CA cert.pem -CAkey key.pem -CAcreateserial -out apache.crt -days 500 -sha256 -extensions req_ext -extfile /etc/pki/tls/openssl.cnf
```
7. Edit the Apache config and point it to the new certificates:
```
sed -i 's|^SSLCertificateFile.*$|SSLCertificateFile /etc/ssl/certs/apache.crt|g' /etc/httpd/conf.d/ssl.conf
sed -i 's|^SSLCertificateKeyFile.*$|SSLCertificateKeyFile /etc/ssl/certs/apache.key|g' /etc/httpd/conf.d/ssl.conf
```
8. Set the firewall to accept the traffic:
```
firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p tcp --dport 80 -j ACCEPT
firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p tcp --dport 443 -j ACCEPT
```
9. Enable and restart Apache after the changes:
```
systemctl enable httpd
systemctl restart httpd
```

### Instruction to generate certificate for a domain
```
openssl genrsa -out apache.key 2048
openssl req -new -sha256 -key apache.key -subj "/C=IE/ST=Clare/O=ESIE/CN=$(hostname -f)" -out apache.csr
openssl x509 -req -in apache.csr -CA cert.pem -CAkey key.pem -CAcreateserial -out apache.crt -days 500 -sha256
```

### Instruction to upload and access images
You must put the images into `/var/www/html`.
```
cp test_image.tar.gz /var/www/html/
chmod a+r /var/www/html/*
```
The URL (Source in Controller UI) should be constructed as: `https://controller_hostname/test_image.tar.gz`

### Instruction to create Traffic Policy and assign it to Interface

#### Creating Traffic Policy

Prerequisites:

- Enrollment phase completed successfully
- User is logged into the UI

The steps to create a sample traffic policy are as follows:

1. From the UI, navigate to the “TRAFFIC POLICIES” tab.
2. Click “ADD POLICY”.

>**NOTE**: This specific traffic policy is only an example.

![Creating Traffic Policy 1](on-premises-app-onboarding-images/CreatingTrafficPolicy.png)
<!-- Are these images available when pushed to the public site? I don’t see them in the otcshare / x-specs repo -->
3. Give the policy a name.
4. Click “ADD” next to “Traffic Rules” field.
5. Fill in the following fields:

- Description: "Sample Description"
- Priority: 99
- Source -> IP Filter -> IP Address: 1.1.1.1
- Source -> IP Filter -> Mask: 24
- Source -> IP Filter -> Begin Port: 10
- Source -> IP Filter -> End Port: 20
- Source -> IP Filter -> Protocol: all
- Target -> Description: "Sample Description"
- Target -> Action: accept

6. Click on "CREATE".

![Creating Traffic Policy 2](on-premises-app-onboarding-images/CreatingTrafficPolicy2.png)

Once created, the Traffic Policy is visible under “List of Traffic Policies” in the “TRAFFIC POLICIES” tab.

![Creating Traffic Policy 3](on-premises-app-onboarding-images/CreatingTrafficPolicy3.png)

#### Adding Traffic Policy to Interface

Prerequisites:

- Enrollment phase completed successfully
- User is logged into the UI
- Traffic Policy is created

To add a previously created traffic policy to an interface available on Edge Node, complete the following steps:

1. From the UI, navigate to the "NODES" tab.
2. Find Edge Node on the “List of Edge Nodes”.
3. Click "EDIT".

>**NOTE**: This step is instructional only; users can decide if they want a traffic policy designated for their interface or a traffic policy designated per application instead.

![Adding Traffic Policy To Interface 1](on-premises-app-onboarding-images/AddingTrafficPolicyToInterface1.png)

4. Navigate to the "INTERFACES" tab.
5. Find the desired interface, which will be used to add traffic policy.
6. Click “ADD” under “Traffic Policy” column for that interface.
7. A window titled “Assign Traffic Policy to interface” will display. Select a previously created traffic policy.
8. Click on “ASSIGN”.

![Adding Traffic Policy To Interface 2](on-premises-app-onboarding-images/AddingTrafficPolicyToInterface2.png)

If successful, users can see “EDIT” and “REMOVE POLICY” buttons under “Traffic Policy” column for the desired interface. These buttons can be respectively used for editing and removing traffic rule policy on that interface.

![Adding Traffic Policy To Interface 3](on-premises-app-onboarding-images/AddingTrafficPolicyToInterface3.png)

# Building applications
Users must prepare the applications that will be deployed on the OpenNESS platform in on-premises mode. Applications should be built as Docker container images or VirtualBox\* vm images and should be hosted on some HTTPS server that is available to the Edge Node. Format for a Docker application image is `.tar.gz` and format for a VirtualBox one is `qcow2`.
Currently, applications are limited to 4096 MB RAM and 8 cores. Memory limits can increase up to 16384 in the `eva.json` file.

The OpenNESS [EdgeApps](https://github.com/otcshare/edgeapps) repository provides images for OpenNESS supported applications. They should be downloaded on a machine with Docker installed.

## Building the OpenVINO application images
The OpenVINO application is available in this [location in EdgeApps repository](https://github.com/otcshare/edgeapps/tree/master/openvino). Further information about the application is contained within `Readme.md` file.

To build a sample application Docker images for testing OpenVINO consumer and producer applications, the following steps are required:

1. To build the producer application image from the application directory, navigate to the `./producer` directory and run:
   ```
   ./build-image.sh
   ```
>**NOTE**: Only CPU inference support is currently available for OpenVINO applications on OpenNESS Network Edge, where the environmental variable `OPENVINO_ACCL` must be set to `CPU` within the available Docker file in the directory.

2. To build the consumer application image from the application directory, navigate to the `./consumer` directory and run:
   ```
   ./build-image.sh
   ```
>**NOTE**: Default consumer inference process is using “CPU 8” to avoid conflicts with NTS. If the desired CPU is changed, the environmental variable `OPENVINO_TASKSET_CPU` must be set within the available Docker file in the directory.
>**NOTE**: `fwd.sh` is using 'CPU 1'. If the desired CPU is changed, users can change `fwd.sh` accordingly.
3. Check that the image builds are successful and available in the local Docker image registry:
   ```
   docker images | grep openvino-prod-app
   docker images | grep openvino-cons-app
   ```

Both images should be extracted from the local Docker repository to an archive file and uploaded to an HTTPS server that will be used by Edge Node to download and deploy the images.

    ```
    docker save -o openvino-prod-app.tar openvino-prod-app
    docker save -o openvino-cons-app.tar openvino-cons-app
    ```

An application to generate sample traffic is provided. The application should be built on a separate host, which generates the traffic.

1. To build the client simulator application image from the application directory, navigate to the `./clientsim` directory and run:
   ```
   ./build-image.sh
   ```
2. Check that the image build is successful and available in the local Docker image registry:
   ```
   docker images | grep client-sim
   ```

# Onboarding applications

## Onboarding container / VM application

### Prerequisites

- Enrollment phase completed successfully
- User is logged into the UI
- NTS must be started
- User has access to an HTTPS server providing a downloadable copy of a Docker container image or VM image.
- A saved copy of the Docker image or VM image in a location accessible by that HTTPS server

### Creating an application

To add an application to list of applications managed by Controller, the following steps are required:

- From the UI, navigate to the “APPLICATIONS” tab.
- Click on the “ADD APPLICATION” button.

![Creating Application 1](on-premises-app-onboarding-images/CreatingApplication1.png)

- After an “Add an Application” window displays, add details per the following example:
  - Name: SampleApp
  - Type: Container
  - Version: 1
  - Vendor: vendor
  - Description: description
  - Cores: 2
  - Memory: 100
  - Source: https://controller_hostname/image_file_name
- The Controllers hostname (or hostname of any other machine serving as an HTTPS server) can be found by running ```hostname -f``` from the terminal of that machine.
- The memory unit used is MB. A sample path to the image could be: https://controller_hostname/sample_docker_app.tar.gz
- The hostname of the controller or server serving HTTPS can be checked by running: ```hostname -f``` command from servers terminal.
- Click “UPLOAD APPLICATION”.
![Creating Application 2](on-premises-app-onboarding-images/CreatingApplication2.png)

- The application will be displayed in Controller's “List of Applications”.

![Creating Application 3](on-premises-app-onboarding-images/CreatingApplication3.png)

### Deploying application steps

The following steps are required:

- From the UI, navigate to the "NODE" tab and click on the "EDIT" button for the desired node.
- Navigate to the "APPS" tab.
- Click on "DEPLOY APP".

![Deploying App 1](on-premises-app-onboarding-images/DeployingApp1.png)

- A window titled "DEPLOY APPLICATION TO NODE" will appear.
- Select the application you want to deploy from the drop-down menu.
- Click "DEPLOY".

![Deploying App 2](on-premises-app-onboarding-images/DeployingApp2.png)

- Your applications will be listed under the "APPS" tab and the status of this app will be "deployed".
- To start the application, click "START".

![Deploying App 3](on-premises-app-onboarding-images/DeployingApp3.png)

- Refresh the browser window to see the change in the status to "running".

![Deploying App 4](on-premises-app-onboarding-images/DeployingApp4.png)

- You can "DELETE/RESTART" an application from this tab.

>**NOTE**: the traffic policy, if any, must be removed before deleting the application.

## Onboarding OpenVINO applications

This section describes how to deploy OpenVINO applications on the OpenNESS platform working in on-premises mode.

### Prerequisites

* OpenNESS for on-premises is fully installed and Edge Node is enrolled to the Edge Controller.
* The Docker images for the OpenVINO are available on HTTPS server and can be accessed by Edge Node.
* A separate host used for generating traffic via Client Simulator is set up.
* The Edge Node host and traffic generating host are connected point to point via unused physical network interfaces.
* A separate host or VM acts as gateway and is used for NTS learning. It should be connected to the Edge Node via physical network interface as well.
* The Docker image for Client Simulator application is available on the traffic generating host.

### Setting up network interfaces

1. The OpenVINO client host machine should have one of its physical interfaces connected to Edge Node machine. The IP address on this interface needs to be set to provide correct packet routing. Set it up using the `ip` command:
   ```
   ip a a 192.168.10.10/24 dev <client_interface_name>
   ```

2. Gateway machine should also have the ip set on the interface connected to the Edge Node:
    ```
    ip a a 192.168.10.9/24 dev <gateway_interface_name>
    ```

    Arps should be set this way:

    ```
    arp -s 192.168.10.11 f2:6c:29:2b:06:e6
    ```
    where `f2:6c:29:2b:06:e6` is the MAC address of the interface bound to the OpenVINO consumer application container.

    The firewall on the gateway machine should disabled or an allowing rule for port 5001 should be applied.

3. Log in to the Edge Controller UI. Move to Traffic Policies page and using the form, add the OpenVino policy per the following instruction:
    * Priority: 99
    * Source:
      * IP Filter Address: 192.168.10.10 (OpenVINO client address)
      * IP Filter Mask: 24
    * Destination:
      * IP Filter Address: 192.168.10.11 (OpenVINO app address)
      * IP Filter Mask: 24
      * Protocol: All
    * Target action: accept

    ![Defining openvino traffic policy](on-premises-app-onboarding-images/openvino-policy1.png)

    ![Defining openvino traffic policy](on-premises-app-onboarding-images/openvino-policy2.png)

>**NOTE**: For creating Traffic Policy, refer to [Instruction to create Traffic Policy and assign it to Interface](#instruction-to-create-traffic-policy-and-assign-it-to-interface)

<!-- Check step 4. below. typos? -->

4. Move to the Edge Node interfaces setup. It should be available under the button “Edit” next to the Edge Node position on the dashboard page.
   * Find the port that is directly connected to the OpenVINO client machine port (eg. 0000:04:00.1)
     * Edit the interface settings:

    ![OpenVINO client machine interface settings](on-premises-app-onboarding-images/if-set-1.png)


   * Find the port that is directly connected to the gateway machine (eg. 0000:04:00.0)
     * Edit interface settings:

    ![OpenVINO client machine interface settings](on-premises-app-onboarding-images/if-set-2.png)

>**NOTE**: The Fallback interface address is the one defined above.

5. Commit those changes to start NTS.
6. Create OpenVINO producer and consumer applications and deploy them on the node. When the applications have a “Deployed” status, start them with 10 seconds distance to allow the producer to subscribe to the platform.

    ![Adding producer application entry to Edge Controller](on-premises-app-onboarding-images/adding-application.png)

>**NOTE**: The fields `Port` and `Protocol` have no effect on the application.

>**NOTE**: When creating a new application, there is an option to specify a key/value pair, which defines an EPA feature. If set, this key/value pair will be used to configure the feature when deploying an application to the Edge Node. For more information on the EPA features supported by OpenNESS, see [Enhanced Platform Awareness](https://github.com/otcshare/x-specs/tree/master/doc/enhanced-platform-awareness).
>**NOTE**: The deployment of the consumer application should be done by analogy.

    ![Applications listed on "applications" page](on-premises-app-onboarding-images/deployed-apps.png)

7. Add the openvino traffic policy to the consumer app.
8. Log in to the consumer container and set the IP address using:
    ```
    docker exec -it <docker_id> /bin/bash
    ip link set dev vEth2 arp off
    ip a a 192.168.10.11/24 dev vEth2
    ip link set dev vEth2 up
    wget 192.168.10.10 -Y off
    ```
9.  Modify the `analytics.openness` entry in `/etc/hosts` with the IP address set in step 1 (a separate interface on the OpenVINO client machine/VM).
10. Send a ping from the OpenVINO client platform to the gateway using 192.168.10.9 as the IP address.
11. On the Edge Node platform, run `./edgenode/internal/nts/client/build/nes_client and check if NTS configured KNI interfaces correctly.

    ![Sample nes-client output](on-premises-app-onboarding-images/nes-client-reference.png)

### Starting traffic from Client Simulator
<!-- the step below needs to be reworded… it needs a break or something. -->
1. On the traffic generating host, build the image for the [Client Simulator](#building-openvino-application-images) before building the image in `tx_video.sh` in the directory containing the image Dockerfile edit the RTP endpoint with IP address of OpenVINO consumer application pod (to get IP address of the pod run: `kubectl exec -it openvino-cons-app ip a`)
2. Run the following from [edgeapps/applications/openvino/clientsim](https://github.com/otcshare/edgeapps/blob/master/applications/openvino/clientsim/run-docker.sh) to start the video traffic via the containerized Client Simulator. Graphical user environment is required to observe the results of the returning video stream.
   ```
   ./run_docker.sh
   ```
<!-- the note below needs to be reworded. -->
> **NOTE**: If a problem is encountered when running the `client-sim ` Docker as `Could not initialize SDL - No available video device`. Disable SELinux through this command:
>  ```shell
>  $ setenforce 0
>  ```

> **NOTE**:  If the video window does not display or an error like `Could not find codec parameters for stream 0` appears, add a rule in the firewall to permit ingress traffic on port `5001`:
>  ```shell
>  firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p udp --dport 5001 -j ACCEPT
>  firewall-cmd --reload
>  ```
