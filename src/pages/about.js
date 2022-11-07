import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import gql from 'graphql-tag'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useQuery } from '@apollo/react-hooks'
import { client, blockClient } from '../apollo/client'

import { Link } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import LinkArrow from '../images/link_arrow.png'


const StyledAbout = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  justify-content: space-between;
  padding: 0 2rem;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  padding-top: 2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};

  @media (max-width: 960px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    margin-top: 0rem;
    padding-top: 1rem;
  }
`

const StyledSectionFlex = styled.div`
  padding: 0 0 4rem 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: ${({ wrapSmall }) => (!wrapSmall ? 'row' : 'column')};
  }
  @media (max-width: 960px) {
    padding: 1rem;
    margin-left: 0;
    margin-top: 0rem;
    width: 100%;
    flex-direction: column;
  }
  h1,
  h2 {
    max-width: 650px;
  }
  p {
    /* margin-bottom: 0.5rem; */
    max-width: 650px;
  }
`

const Numbers = styled(StyledSectionFlex)`
  @media (max-width: 960px) {
    display: none;
  }
`

const Title = styled.h1`
  /* font-size: 3rem; */
  margin-bottom: 4rem;
  font-size: 72px;

  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 1200px;
  /* text-align: center; */
  @media (max-width: 960px) {
    font-size: 2rem;
  }
`

const InternalLink = styled(Link)`
  border-radius: 8px;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  h2 {
    margin: 0;
  }

  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    transform: translate3d(2px, 2px, 10px);
  }
`

const InternalLinkTo = styled.a`
  border-radius: 8px;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  h2 {
    margin: 0;
  }

  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    transform: translate3d(2px, 2px, 10px);
  }
`

const SubTitle = styled.div`
  font-size: 65px;
  color: #32F0C0;
`

const ExternalLink = styled.a`
  border-radius: 8px;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  h2 {
    margin: 0;
  }

  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    transform: translate3d(2px, 2px, 10px);
  }
`

export const GET_BLOCK = gql`
  query blocks($timestamp: Int!) {
    blocks(first: 1, orderBy: timestamp, orderDirection: asc, where: { timestamp_gt: $timestamp }) {
      id
      number
      timestamp
    }
  }
`

export const ETH_PRICE = block => {
  const queryString = block
    ? `
    query bundles {
      bundles(where: { id: ${1} } block: {number: ${block}}) {
        id
        ethPrice
      }
    }
  `
    : ` query bundles {
      bundles(where: { id: ${1} }) {
        id
        ethPrice
      }
    }
  `
  return gql(queryString)
}

const APOLLO_QUERY = gql`
  {
    StarswapFactory(id: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f") {
      totalVolumeUSD
      totalLiquidityUSD
      pairCount
      txCount
    }
    bundle(id: 1) {
      ethPrice
    }
  }
`

export const Starswap_GLOBALS_24HOURS_AGO_QUERY = block => {
  let queryString = `
  query StarswapFactory {
    StarswapFactory(id: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", block: { number: ${block} }) {
      totalVolumeUSD
      totalLiquidityUSD
      pairCount
    
    }
  }
  `
  return gql(queryString)
}

const About = props => {
  dayjs.extend(utc)
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').unix()

  const { data: blockData } = useQuery(GET_BLOCK, {
    client: blockClient,
    variables: {
      timestamp: utcOneDayBack
    }
  })
  const oneDayBackBlock = blockData?.blocks?.[0]?.number
  const { data } = useQuery(APOLLO_QUERY, { pollInterval: 10000, client: client })

  const [oneDayResult, setOnedayResult] = useState()

  useEffect(() => {
    async function getData() {
      let result = await client.query({
        query: Starswap_GLOBALS_24HOURS_AGO_QUERY(oneDayBackBlock),

        fetchPolicy: 'cache-first'
      })
      if (result) {
        setOnedayResult(result?.data?.StarswapFactory)
      }
    }
    if (oneDayBackBlock) {
      getData()
    }
  }, [oneDayBackBlock])

  let UniStats = {
    key: function(n) {
      return this[Object.keys(this)[n]]
    }
  }

  if (data && oneDayResult) {
    const volume24Hour = parseFloat(data?.StarswapFactory?.totalVolumeUSD) - parseFloat(oneDayResult?.totalVolumeUSD)

    UniStats.volume = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short'
      }).format(volume24Hour)
    ]
    UniStats.liquidity = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short'
        // maximumSignificantDigits: 5
      }).format(data.StarswapFactory.totalLiquidityUSD)
    ]
    UniStats.exchanges = [Number.parseFloat(data?.StarswapFactory?.pairCount)]

    UniStats.ETHprice = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 5
      }).format(parseFloat(data?.bundle?.ethPrice)),
      '<small> Uni ETH Price </small>'
    ]
  }

  return (
    <Layout path={props.location.pathname}>
      <SEO title="About" path={props.location.pathname} />
      <StyledAbout>
        <span style={{ marginTop: '5rem' }}>
          <Title style={{ paddingBottom: '4rem' }}>
            <span style={{color: '#32F0C0'}}>Pioneering DEX with</span>
            <div style={{margin: '30px 0'}}>Dao Governance <span style={{color: '#32F0C0'}}>in</span></div>
            <span style={{color: '#32F0C0'}}>Move Ecosystem</span>
          </Title>

          <Numbers id="about" style={{ flexDirection: 'column' }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', margin: 0 }}>
              <h2 style={{ fontSize: '60px', textAlign: 'center' }}>
              968K
                <p style={{ fontSize: '22px', marginTop: '15px' }}>Trade Volume </p>
              </h2>
              <h2 style={{ fontSize: '60px', textAlign: 'center' }}>
              106.04K
                <p style={{ fontSize: '22px', marginTop: '15px' }}>24H Volume</p>
              </h2>
              <h2 style={{ fontSize: '60px', textAlign: 'center' }}>
                5
                <p style={{ fontSize: '22px', marginTop: '15px' }}>All Tokens</p>
              </h2>
              <h2 style={{ fontSize: '60px', textAlign: 'center' }}>
                4
                <p style={{ fontSize: '22px', marginTop: '15px' }}>Pools</p>
              </h2>
            </div>
          </Numbers>
          <SubTitle>ABOUT US</SubTitle>
          <StyledSectionFlex id="about" style={{ fontSize: '27px' }}>
            <div>
              <p>
              Starswap is a decentralized exchange (DEX) that is deployed in a smart contract network on the Starcoin block chain. Every wallet holder on the Starcoin can freely exchange tokens on the Starswap, and become an automated mark maker (AMM) by providing and staking liquidity.
              </p>
            <div style={{ display: 'flex', width: '100%', margin: 0, fontSize: '24px' }}>
            <InternalLinkTo href='https://docs.starswap.xyz/' target='_blank'>Docs <img style={{marginLeft: '10px', verticalAlign: 'middle', marginBottom: '0'}} src={LinkArrow} /></InternalLinkTo>
              <InternalLinkTo href='https://starswap.xyz' target='_blank'>App <img style={{marginLeft: '10px', verticalAlign: 'middle', marginBottom: '0'}} src={LinkArrow} /></InternalLinkTo>
              <InternalLinkTo href='https://github.com/Elements-Studio' target='_blank'>Github <img style={{marginLeft: '10px', verticalAlign: 'middle', marginBottom: '0'}} src={LinkArrow} /></InternalLinkTo>
              <InternalLink to="/faq">FAQ <img style={{marginLeft: '10px', verticalAlign: 'middle', marginBottom: '0'}} src={LinkArrow} /></InternalLink>
            </div>
            </div>
            <p style={{marginTop: '100px'}}>Starswap was developed by Elements Studio team . It has good features of asset security, fast trading speed, low trading cost, and advanced decentralized autonomous organization (DAO) management. Therefore, Starswap is being popular in the community of blockchains and attracts many attentions around the world.</p>
          </StyledSectionFlex>

          <StyledSectionFlex id="contact" style={{ flexDirection: 'column' }}>
            <SubTitle>CONTACT</SubTitle>
            <p style={{fontSize: '27px'}}>
              We encourage anyone facing issues with their wallet, transaction or Starswap related question to join our
              active community discord or explore the{' '} help & tutorial site.
            </p>

            <div style={{ display: 'flex', width: '100%', margin: 0, fontSize: '24px' }}>
              <ExternalLink href={'https://discord.com/invite/96tKt5exaE'}>
                Discord <img style={{marginLeft: '10px', verticalAlign: 'middle', marginBottom: '0'}} src={LinkArrow} />
              </ExternalLink>
              <ExternalLink href={'https://twitter.com/StarswapEN'}>
                Twitter <img style={{marginLeft: '10px', verticalAlign: 'middle', marginBottom: '0'}} src={LinkArrow} />
              </ExternalLink>
              <ExternalLink href={'https://t.me/StarswapEN'}>
                Telegram <img style={{marginLeft: '10px', verticalAlign: 'middle', marginBottom: '0'}} src={LinkArrow} />
              </ExternalLink>
            </div>
          </StyledSectionFlex>

          {/* <StyledSectionFlex id="brand" style={{ flexDirection: 'column' }}>
            <h2 style={{ width: '100%' }}>Brand Assets</h2>
            <p>
              Download the logo and other brand assets samples <a href="/Starswap_brand_assets.zip">here</a>.
            </p>
          </StyledSectionFlex> */}
        </span>
      </StyledAbout>
    </Layout>
  )
}

export default About
