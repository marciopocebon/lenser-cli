FROM centos:7
LABEL maintainer="felix.hammerl@gmail.com"

RUN yum -y -q update
RUN yum -y -q remove iputils
RUN yum -y -q install ca-certificates
RUN yum -y -q install wget epel-release openssl openssl-devel tar unzip \
 			  libffi-devel redhat-rpm-config git-core \
 			  gcc gcc-c++ make zlib-devel pcre-devel

ENV CLAIR_SCANNER_VERSION=v10
ADD "https://github.com/arminc/clair-scanner/releases/download/${CLAIR_SCANNER_VERSION}/clair-scanner_linux_amd64" /usr/local/bin/clair-scanner
RUN chmod +x /usr/local/bin/clair-scanner

ENV NODE_VERSION=10.16.0
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
RUN yum -y install nodejs-${NODE_VERSION}

RUN node --version && \
    npm --version

RUN yum -y -q clean all

RUN mkdir -p /lenser
COPY ./ /lenser
RUN cd /lenser && \
    npm install --production --quiet

WORKDIR /target

ENV PATH=/lenser/bin:$PATH
ENTRYPOINT ["lenser", "scan"]
