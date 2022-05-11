<script setup>
import { ref } from "vue";
import { ethers } from "ethers";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS
} from "../../constants";
console.log(CONTRACT_ABI);
const domain = ref("");
const record = ref("");
const tld = ref(".melbs");
async function mintDomain() {
  if (!domain.value) {
    return;
  }
  if (domain.value.length < 3) {
    alert("domain must be longer than 3");
    return;
  }
  const price =
    domain.value.length === 3
      ? "0.05"
      : domain.value.length === 4
      ? "0.03"
      : "0.01";
  console.log("minting domain", domain.value, "with price", price);
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      console.log("talk to the wallet and pay gas");
      let tx = await contract.register(domain.value, {
        value: ethers.utils.parseEther(price)
      });
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        console.log(
          "domain minted https://mumbai.polygonscan.com/tx/" + tx.hash
        );
      }
      tx = await contract.setRecord(domain.value, record.value);
      await tx.wait();
      record.value = "";
      domain.value = "";
      console.log("record set! https://mumbai.polygonscan.com/tx/" + tx.hash);
    } else {
      alert("transaction failed, please try again");
    }
  } catch (error) {
    console.log("error", error);
  }
}
</script>

<template>
  <div className="form-container">
    <div className="first-row">
      <input type="text" placeholder="domain" v-model="domain" />
      <p className="tld">{{ tld }}</p>
    </div>

    <input type="text" v-model="record" placeholder="Enter your record" />

    <div className="button-container">
      <button className="cta-button mint-button" @click="mintDomain">
        Mint
      </button>
    </div>
  </div>
</template>