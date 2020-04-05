import "reflect-metadata";
import * as express from "express";
import axios, { AxiosResponse } from "axios"
import config from './config'
import * as Prometheus from 'prom-client'
import { ElrondStatus } from './status';
import { 
  ElrondConnectedNodes,
  ElrondAcceptedBlock,
  ElrondConsensus,
  ElrondConsensusAcceptedBlock,
  ElrondLeaders,
  ElrondCPULoadPercent,
  ElrondCurrentBlockSize,
  ElrondCurrentRound,
  ElrondValidatorLive,
  ElrondMemoryLoadPercent,
  ElrondMemoryTotal,
  ElrondMemoryUsedByGolang,
  ElrondMemoryUsedBySys,
  ElrondConsensusGroupSize,
  ElrondNumValidators,
  ElrondNetworkRecvBps,
  ElrondNetworkRecvPercent,
  ElrondNetworkSentBps,
  ElrondNetworkSentPercent,
  ElrondConnectedPeers,
  ElrondTransactionProcessed,
  ElrondSynchronizedRound
} from './metrics'

const axiosInstance = axios.create({
  baseURL: config.ERD_NODE_URL,
  timeout: 1000
});

console.log(config.ERD_NODE_URL)

setInterval(async () => {

  let metrics: AxiosResponse<ElrondStatus> = await axiosInstance.get<ElrondStatus>('/node/status')

  let labelNames: Prometheus.labelValues = {
    erd_app_version: metrics.data.details.erd_app_version,
    erd_chain_id: metrics.data.details.erd_chain_id,
    erd_latest_tag_software_version: metrics.data.details.erd_latest_tag_software_version,
    erd_node_display_name: metrics.data.details.erd_node_display_name,
    erd_node_type: metrics.data.details.erd_node_type,
    erd_peer_type: metrics.data.details.erd_peer_type,
    erd_public_key_block_sign: metrics.data.details.erd_public_key_block_sign,
  }

  if(labelNames.erd_peer_type == undefined)
    return

  ElrondConnectedNodes.set(labelNames, metrics.data.details.erd_connected_nodes)
  ElrondAcceptedBlock.set(labelNames, metrics.data.details.erd_connected_nodes)
  ElrondConsensus.set(labelNames, metrics.data.details.erd_count_consensus)
  ElrondConsensusAcceptedBlock.set(labelNames, metrics.data.details.erd_count_accepted_blocks)
  ElrondLeaders.set(labelNames, metrics.data.details.erd_count_leader)
  ElrondCPULoadPercent.set(labelNames, metrics.data.details.erd_cpu_load_percent)
  ElrondCurrentBlockSize.set(labelNames, metrics.data.details.erd_current_block_size)
  ElrondCurrentRound.set(labelNames, metrics.data.details.erd_current_round)
  ElrondValidatorLive.set(labelNames, metrics.data.details.erd_live_validator_nodes)
  ElrondMemoryLoadPercent.set(labelNames, metrics.data.details.erd_mem_load_percent)
  ElrondMemoryTotal.set(labelNames, metrics.data.details.erd_mem_total)
  ElrondMemoryUsedByGolang.set(labelNames, metrics.data.details.erd_mem_used_golang)
  ElrondMemoryUsedBySys.set(labelNames, metrics.data.details.erd_mem_used_sys)
  ElrondConsensusGroupSize.set(labelNames, metrics.data.details.erd_metric_consensus_group_size)
  ElrondNumValidators.set(labelNames, metrics.data.details.erd_metric_num_validators)
  ElrondNetworkRecvBps.set(labelNames, metrics.data.details.erd_network_recv_bps)
  ElrondNetworkRecvPercent.set(labelNames, metrics.data.details.erd_network_recv_percent)
  ElrondNetworkSentBps.set(labelNames, metrics.data.details.erd_network_sent_bps)
  ElrondNetworkSentPercent.set(labelNames, metrics.data.details.erd_network_sent_percent)
  ElrondConnectedPeers.set(labelNames, metrics.data.details.erd_num_connected_peers)
  ElrondTransactionProcessed.set(labelNames, metrics.data.details.erd_num_transactions_processed)
  ElrondSynchronizedRound.set(labelNames, metrics.data.details.erd_synchronized_round)

}, 15000)


/**
 * Express HTTP API
 */
const app = express();


app.get('/metrics', (req: express.Request, res: express.Response) => {
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(Prometheus.register.metrics())
})

app.listen(config.HTTP_PORT, () => {
  console.log(`Metrics HTTP Server started on port ${config.HTTP_PORT}!`);
});
 
