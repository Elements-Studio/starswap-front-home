import gql from 'graphql-tag'

export const GLOBAL_QUERY = gql`
  {
    StarswapFactory(id: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f") {
      totalVolumeUSD
      totalLiquidityUSD
      pairCount
      txCount
    }
  }
`
