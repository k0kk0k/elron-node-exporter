# Elrond node exporter

This exporter request `/node/status` of an Elrond node and expose metrics formatted for Prometheus
This repo imported from original repo on gitlab: https://gitlab.com/bliiitz-corp/elrond/elrond-node-exporter

# Prerequisites:
Install Node.js v14.x:
```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# Install dependencies and build
```
git clone https://github.com/k0kk0k/elron-node-exporter.git
cd https://github.com/k0kk0k/elrond-node-exporter.git
npm install
npm run build
```

# Execute
`npm run start`

# Environment variables default:

- HTTP_PORT: '8081' (Port witch expose prometheus metrics endpoint)
- ERD_NODE_URL: 'http://localhost:8080' (Root url of elrond node)
- DEBUG: 'false' (print each request response of elrond node)


