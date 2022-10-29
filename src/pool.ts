import { BigInt } from "@graphprotocol/graph-ts";
import {
  LiquidityAdded as LiquidityAddedEvent,
  LiquidityWithdrawn as LiquidityWithdrawnEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/templates/Pool/Pool";
import { LiquidityAdded, LiquidityWithdrawn, OwnershipTransferred } from "../generated/schema";
import { dataSource } from "@graphprotocol/graph-ts";

let context = dataSource.context()
let id = context.getString("id");

export function handleLiquidityAdded(event: LiquidityAddedEvent): void {
  let entity = new LiquidityAdded(event.transaction.hash.toHex());
  entity.from = event.params._from;
  entity.amount1 = event.params._amount1;
  entity.amount2 = event.params._amount2;
  entity.createdAt = event.block.timestamp;
  entity.pool = id;

  entity.save();
}

export function handleLiquidityWithdrawn(event: LiquidityWithdrawnEvent): void {
  let entity = new LiquidityWithdrawn(event.transaction.hash.toHex());
  entity.from = event.params._from;
  entity.amount1 = event.params._amount1;
  entity.amount2 = event.params._amount2;
  entity.lpTokens = event.params._lpTokens;
  entity.createdAt = event.block.timestamp;
  entity.pool = id;

  entity.save();
}

export function handleOwnershipTransfered(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.toHex());

  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;
  entity.createdAt = event.block.timestamp;
  entity.pool = id;

  entity.save();
}
