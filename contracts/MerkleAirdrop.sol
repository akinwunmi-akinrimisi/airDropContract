// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./IERC20.sol";

contract MerkleAirdrop {
    bytes32 private root;
    address tokenAddress;
    IERC20 public giftToken;


    mapping (address => bool) isClaimed;
    event AirdropClaimed(address _address, uint256 amount);

    constructor(address _tokenAddress, bytes32 _root) {
        root = _root;
        tokenAddress = _tokenAddress;
        giftToken = IERC20(_tokenAddress);
    }

    function claimAirdrop(bytes32[] memory proof, address addr, uint256 amount) public {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(addr, amount))));
        require(MerkleProof.verify(proof, root, leaf), "Invalid proof");
        require(!isClaimed[addr], "Airdrop claimed already.");
        //Send Amount to The address
        isClaimed[addr] = true;
        require(giftToken.transfer(msg.sender, amount), "Airdrop Claming Failed");
        emit AirdropClaimed(msg.sender, amount);
    }
}