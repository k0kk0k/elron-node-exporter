import * as Prometheus from 'prom-client'

const labelNames: string[] = [
  "erd_app_version",
  "erd_chain_id",
  "erd_latest_tag_software_version",
  "erd_node_display_name",
  "erd_node_type",
  "erd_peer_type",
  "erd_public_key_block_sign"
]

export const ElrondConnectedNodes = new Prometheus.Gauge({
	name: 'erd_connected_nodes',
	help: 'erd_connected_nodes',
	labelNames,
});

export const ElrondAcceptedBlock = new Prometheus.Gauge({
	name: 'erd_count_accepted_blocks',
	help: 'erd_count_accepted_blocks',
	labelNames,
});

export const ElrondConsensus = new Prometheus.Gauge({
	name: 'erd_count_consensus',
	help: 'erd_count_consensus',
	labelNames,
});

export const ElrondConsensusAcceptedBlock = new Prometheus.Gauge({
	name: 'erd_count_consensus_accepted_blocks',
	help: 'erd_count_consensus_accepted_blocks',
	labelNames,
});

export const ElrondLeaders = new Prometheus.Gauge({
	name: 'erd_count_leader',
	help: 'erd_count_leader',
	labelNames,
});


export const ElrondCPULoadPercent = new Prometheus.Gauge({
	name: 'erd_cpu_load_percent',
	help: 'erd_cpu_load_percent',
	labelNames,
});

export const ElrondCurrentBlockSize = new Prometheus.Gauge({
	name: 'erd_current_block_size',
	help: 'erd_current_block_size',
	labelNames,
});


export const ElrondCurrentRound = new Prometheus.Gauge({
	name: 'erd_current_round',
	help: 'erd_current_round',
	labelNames,
});

export const ElrondValidatorLive = new Prometheus.Gauge({
	name: 'erd_live_validator_nodes',
	help: 'erd_live_validator_nodes',
	labelNames,
});

export const ElrondMemoryLoadPercent = new Prometheus.Gauge({
	name: 'erd_mem_load_percent',
	help: 'erd_mem_load_percent',
	labelNames,
});

export const ElrondMemoryTotal = new Prometheus.Gauge({
	name: 'erd_mem_total',
	help: 'erd_mem_total',
	labelNames,
});

export const ElrondMemoryUsedByGolang = new Prometheus.Gauge({
	name: 'erd_mem_used_golang',
	help: 'erd_mem_used_golang',
	labelNames,
});

export const ElrondMemoryUsedBySys = new Prometheus.Gauge({
	name: 'erd_mem_used_sys',
	help: 'erd_mem_used_sys',
	labelNames,
});

export const ElrondConsensusGroupSize = new Prometheus.Gauge({
	name: 'erd_metric_consensus_group_size',
	help: 'erd_metric_consensus_group_size',
	labelNames,
});

export const ElrondNumValidators = new Prometheus.Gauge({
	name: 'erd_metric_num_validators',
	help: 'erd_metric_num_validators',
	labelNames,
});

export const ElrondNetworkRecvBps = new Prometheus.Gauge({
	name: 'erd_network_recv_bps',
	help: 'erd_network_recv_bps',
	labelNames,
});

export const ElrondNetworkRecvPercent = new Prometheus.Gauge({
	name: 'erd_network_recv_percent',
	help: 'erd_network_recv_percent',
	labelNames,
});

export const ElrondNetworkSentBps = new Prometheus.Gauge({
	name: 'erd_network_sent_bps',
	help: 'erd_network_sent_bps',
	labelNames,
});


export const ElrondNetworkSentPercent = new Prometheus.Gauge({
	name: 'erd_network_sent_percent',
	help: 'erd_network_sent_percent',
	labelNames,
});

export const ElrondConnectedPeers = new Prometheus.Gauge({
	name: 'erd_num_connected_peers',
	help: 'erd_num_connected_peers',
	labelNames,
});

export const ElrondTransactionProcessed = new Prometheus.Gauge({
	name: 'erd_num_transactions_processed',
	help: 'erd_num_transactions_processed',
	labelNames,
});

export const ElrondSynchronizedRound = new Prometheus.Gauge({
	name: 'erd_synchronized_round',
	help: 'erd_synchronized_round',
	labelNames,
});
