FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV FOUNDRY_DIR=/root/.foundry/bin
ENV PATH="$HOME/.foundry/bin:$PATH"

# Install prerequisites
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    wget \
    ca-certificates \
    gnupg \
    lsb-release \
    python3 \
    python3-pip \
    python3-venv \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash

# Install Node.js (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install Slither
RUN pip3 install slither-analyzer

# Install Echidna
RUN pip3 install echidna

# Install Aderyn
RUN pip3 install aderyn

# Install Medusa
RUN pip3 install medusa

# Install Halmos
RUN pip3 install halmos

# Install Certora CLI
RUN pip3 install certora-cli

# Install Solc via foundry
RUN foundryup

# Install the course repo (read-only reference)
RUN git clone https://github.com/Cyfrin/security-and-auditing-full-course-s23.git /course

# Set working directory
WORKDIR /chaincodecamp

# Copy app files
COPY . .

# Install npm dependencies
RUN npm install

# Expose Next.js port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]