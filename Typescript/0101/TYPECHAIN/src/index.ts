import * as CryptoJs from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previoushash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockhash = (
    index: number,
    previoushash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJs.SHA256(index + previoushash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previoushash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  constructor(
    index: number,
    hash: string,
    previoushash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previoushash = previoushash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "123123123", "", "Hello", 20220102);

let blockchain: [Block] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const CreateNewBlock = (data: string): Block => {
  const PreviousBlock: Block = getLatestBlock();
  const newIndex: number = PreviousBlock.index + 1;
  const nextTimestamp: number = getNewTimeStamp();
  const nextHash: string = Block.calculateBlockhash(
    newIndex,
    PreviousBlock.hash,
    nextTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    nextHash,
    PreviousBlock.hash,
    data,
    nextTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
  Block.calculateBlockhash(
    aBlock.index,
    aBlock.previoushash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previoushash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    getBlockchain().push(candidateBlock);
  }
};

CreateNewBlock("second block");
CreateNewBlock("third block");
CreateNewBlock("4th block");
CreateNewBlock("5th block");
CreateNewBlock("6th block");

console.log(getBlockchain());
export {};
