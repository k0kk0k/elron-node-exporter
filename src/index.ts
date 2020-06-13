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
  ElrondNetworkRecvBps,
  ElrondNetworkRecvPercent,
  ElrondNetworkSentBps,
  ElrondNetworkSentPercent,
  ElrondConnectedPeers,
  ElrondTransactionProcessed,
  ElrondSynchronizedRound,
  ElrondConsensusReceivedProposedBlock,
  ElrondConsensusProcessedProposedBlock,
  ElrondNetworkRecvBpsPeak,
  ElrondNetworkSentBpsPeak
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

  if(config.DEBUG == "true")
    console.log(metrics.data.details)


  if(metrics.data.details.erd_connected_nodes)
    ElrondConnectedNodes.set(labelNames, metrics.data.details.erd_connected_nodes)

  if(metrics.data.details.erd_connected_nodes)
    ElrondAcceptedBlock.set(labelNames, metrics.data.details.erd_connected_nodes)

  if(metrics.data.details.erd_count_consensus)
    ElrondConsensus.set(labelNames, metrics.data.details.erd_count_consensus)

  if(metrics.data.details.erd_count_accepted_blocks)
    ElrondConsensusAcceptedBlock.set(labelNames, metrics.data.details.erd_count_accepted_blocks)

  if(metrics.data.details.erd_count_leader)
    ElrondLeaders.set(labelNames, metrics.data.details.erd_count_leader)

  if(metrics.data.details.erd_cpu_load_percent)
    ElrondCPULoadPercent.set(labelNames, metrics.data.details.erd_cpu_load_percent)

  if(metrics.data.details.erd_current_block_size)
    ElrondCurrentBlockSize.set(labelNames, metrics.data.details.erd_current_block_size)

  if(metrics.data.details.erd_current_round)
    ElrondCurrentRound.set(labelNames, metrics.data.details.erd_current_round)

  if(metrics.data.details.erd_live_validator_nodes)
    ElrondValidatorLive.set(labelNames, metrics.data.details.erd_live_validator_nodes)

  if(metrics.data.details.erd_mem_load_percent)
    ElrondMemoryLoadPercent.set(labelNames, metrics.data.details.erd_mem_load_percent)

  if(metrics.data.details.erd_mem_total)  
    ElrondMemoryTotal.set(labelNames, metrics.data.details.erd_mem_total)

  if(metrics.data.details.erd_mem_used_golang)
    ElrondMemoryUsedByGolang.set(labelNames, metrics.data.details.erd_mem_used_golang)

  if(metrics.data.details.erd_mem_used_sys)
    ElrondMemoryUsedBySys.set(labelNames, metrics.data.details.erd_mem_used_sys)

  if(metrics.data.details.erd_consensus_group_size)
    ElrondConsensusGroupSize.set(labelNames, metrics.data.details.erd_consensus_group_size)

  if(metrics.data.details.erd_network_recv_bps)
    ElrondNetworkRecvBps.set(labelNames, metrics.data.details.erd_network_recv_bps)

  if(metrics.data.details.erd_network_recv_bps_peak)
    ElrondNetworkRecvBpsPeak.set(labelNames, metrics.data.details.erd_network_recv_bps_peak)

  if(metrics.data.details.erd_network_recv_percent)
    ElrondNetworkRecvPercent.set(labelNames, metrics.data.details.erd_network_recv_percent)

  if(metrics.data.details.erd_network_sent_bps)
    ElrondNetworkSentBps.set(labelNames, metrics.data.details.erd_network_sent_bps)

  if(metrics.data.details.erd_network_sent_bps_peak)
    ElrondNetworkSentBpsPeak.set(labelNames, metrics.data.details.erd_network_sent_bps_peak)

  if(metrics.data.details.erd_network_sent_percent)
    ElrondNetworkSentPercent.set(labelNames, metrics.data.details.erd_network_sent_percent)

  if(metrics.data.details.erd_num_connected_peers)
    ElrondConnectedPeers.set(labelNames, metrics.data.details.erd_num_connected_peers)

  if(metrics.data.details.erd_num_transactions_processed)
    ElrondTransactionProcessed.set(labelNames, metrics.data.details.erd_num_transactions_processed)

  if(metrics.data.details.erd_synchronized_round)
    ElrondSynchronizedRound.set(labelNames, metrics.data.details.erd_synchronized_round)

  if(metrics.data.details.erd_consensus_processed_proposed_block)
    ElrondConsensusProcessedProposedBlock.set(labelNames, metrics.data.details.erd_consensus_processed_proposed_block)

  if(metrics.data.details.erd_consensus_received_proposed_block)
    ElrondConsensusReceivedProposedBlock.set(labelNames, metrics.data.details.erd_consensus_received_proposed_block)
  

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
 
