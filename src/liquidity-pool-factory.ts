import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import {
  LiquidityPoolFactory,
  PoolCreated as PoolCreatedEvent,
} from "../generated/LiquidityPoolFactory/LiquidityPoolFactory";
import { Pool } from "../generated/schema";
import { Pool as PoolTemplate } from "../generated/templates";

export function handlePoolCreated(event: PoolCreatedEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = new Pool(event.params._token1.toHex() + "-" + event.params._token2.toHex());

  entity.address = event.params._pool;
  entity.token1 = event.params._token1;
  entity.token2 = event.params._token2;
  entity.createdAt = event.block.timestamp;
  entity.save();

  let context = new DataSourceContext();
  context.setString("id", event.params._token1.toHex() + "-" + event.params._token2.toHex());
  PoolTemplate.createWithContext(event.params._pool, context);
}

