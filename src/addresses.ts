import type { NetworkAddresses, Network } from './types.js'

const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const TESTNET_ADDRESSES: NetworkAddresses = {
  tradingVault: '0x3728F306Bc29d2A702cDb7919495E54F809405F8',
  sevenN7DToken: '0x8D8572E3bBC1F813997b9C4503c2243CcF3f2D72',
  usdc: '0x10297B02cFBe672267903E92deEc36Cff24C5D77',
  profitDistributor: '0xA9dBEBd6898961cB5B3DA7BeeA9b3A1974956771',
  governanceDAO: '0x3DE4AB52e6Aaba118aa681eC83fb7c1bC176f664',
}

// Mainnet contracts are not yet deployed. Placeholder zeros prevent silent
// no-op transactions — getAddresses() throws until real addresses are set.
export const MAINNET_ADDRESSES: NetworkAddresses = {
  tradingVault: ZERO_ADDR,
  sevenN7DToken: ZERO_ADDR,
  usdc: ZERO_ADDR,
  profitDistributor: ZERO_ADDR,
  governanceDAO: ZERO_ADDR,
}

export function getAddresses(network: Network): NetworkAddresses {
  if (network === 'mainnet') {
    const zeros = Object.entries(MAINNET_ADDRESSES).filter(([, v]) => v === ZERO_ADDR)
    if (zeros.length > 0) {
      throw new Error(
        `Network "mainnet" has no deployed contracts yet. ` +
        `Use network: 'testnet' instead, or wait for the mainnet launch. ` +
        `Contracts with zero addresses: ${zeros.map(([k]) => k).join(', ')}.`
      )
    }
  }
  return network === 'mainnet' ? MAINNET_ADDRESSES : TESTNET_ADDRESSES
}
