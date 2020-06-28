# Elrond node exporter

This exporter request `/node/status` of an Elrond node and expose metrics formatted for Prometheus
This repo imported from original repo on gitlab: https://gitlab.com/bliiitz-corp/elrond/elrond-node-exporter


# Environment variables default:

- HTTP_PORT: '8081' (Port witch expose prometheus metrics endpoint)
- ERD_NODE_URL: 'http://localhost:8080' (Root url of elrond node)
- DEBUG: 'false' (print each request response of elrond node)
