import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const NGTokenModule = buildModule("NGTokenModule", (m) => {

  const nGToken= m.contract("NGToken");

  return { nGToken };
});

export default NGTokenModule;