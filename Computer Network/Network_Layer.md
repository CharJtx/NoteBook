### 路由选择协议
路由选择协议都是自适应的，能随着网络通信量和拓扑结构的变化而自适应地进行调整。互联网可以划分为许多较小的自治系统 AS，一个 AS 可以使用一种和别的 AS 不同的路由选择协议。（互联网的自治系统（Autonomous System, AS）是指在单一管理域下运行的一组IP网络和路由器，它们使用相同的路由策略，并通过统一的内部网关协议（IGP）进行路由管理。每个自治系统都有一个唯一的编号，称为AS号（ASN），用于在互联网中标识该系统。）
可以把路由选择协议划分为两大类：

* 自治系统内部的路由选择：RIP 和 OSPF
  * 内部网关协议 RIP
  * 内部网关协议 OSPF
* 自治系统间的路由选择：BGP
  * 外部网关协议 BGP ：BGP（Border Gateway Protocol，边界网关协议）
