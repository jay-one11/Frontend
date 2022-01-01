"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
class Block {
    constructor(index, hash, previoushash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previoushash = previoushash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockhash = (index, previoushash, timestamp, data) => CryptoJs.SHA256(index + previoushash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previoushash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "123123123", "", "Hello", 20220102);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const CreateNewBlock = (data) => {
    const PreviousBlock = getLatestBlock();
    const newIndex = PreviousBlock.index + 1;
    const nextTimestamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockhash(newIndex, PreviousBlock.hash, nextTimestamp, data);
    const newBlock = new Block(newIndex, nextHash, PreviousBlock.hash, data, nextTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock) => Block.calculateBlockhash(aBlock.index, aBlock.previoushash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previoushash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
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
//# sourceMappingURL=index.js.map