import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { PoolCreated } from "../generated/LiquidityPoolFactory/LiquidityPoolFactory"

export function createPoolCreatedEvent(
  _pool: Address,
  _token1: Address,
  _token2: Address
): PoolCreated {
  let poolCreatedEvent = changetype<PoolCreated>(newMockEvent())

  poolCreatedEvent.parameters = new Array()

  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("_pool", ethereum.Value.fromAddress(_pool))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("_token1", ethereum.Value.fromAddress(_token1))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("_token2", ethereum.Value.fromAddress(_token2))
  )

  return poolCreatedEvent
}
