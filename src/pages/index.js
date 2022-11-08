import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../layouts'
import SEO from '../components/seo'
import BG from '../components/bg'
import { Button } from '../components/button'
import ProtocolData from '../components/protocolData'
import { useDarkMode } from '../contexts/Application'
import { CardBGImage, CardGlimmerImage } from '../components/utils'

import PinkGlimmer from '../images/pink_glimmer.inline.svg'
import Twitter from '../images/twitter.inline.svg'
import Github from '../images/github.inline.svg'
import Discord from '../images/discord.inline.svg'
import DevImage from '../images/developer.png'
import GovImage from '../images/governance.png'
import AppsImage from '../images/apps.png'
import RightImage from '../images/right_arrow.png'
import BottomImage from '../images/bottom_arrow.png'
import LineImage from '../images/line.svg';
import Telegram from '../images/telegram.png'

import '../styles/home.css'

const BGCard = styled.span`
  width: 100vw;
  height: 100vh;
  max-height: 1220px;
  user-select: none;
  background-repeat: no-repeat;
  background: ${({ theme }) => theme.heroBG};
  background-size: contain;
  mix-blend-mode: overlay;

  @media (max-width: 960px) {
    width: 100vw;
    height: 100vh;
  }
`

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.buttonBorder};
  @media (max-width: 960px) {
    margin-bottom: 0;
    padding: 1rem;
    padding-bottom: 8rem;
  }
`

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  will-change: transform;
  align-items: flex-start;
  margin-top: 378px;
  height: 60vh;
  margin-bottom: 4rem;
`

const StyledBodyTitle = styled.h1`
  font-size: 56px;
  white-space: wrap;
  overflow-wrap: normal;
  @media (max-width: 1024px) {
    margin: 2rem 0 0rem 0;
  }

  @media (max-width: 640px) {
    width: 100%;
    margin: 2rem 0 2rem 0;
    font-weight: 500;
    text-align: left;
    font-size: 58px;
  }

  @media (max-width: 440px) {
    font-weight: 500;
    text-align: left;
    font-size: 52px;
  }
`
const StyledBodySubTitle = styled.h2`
  line-height: 125%;
  font-weight: 400;
  text-align: left;

  @media (max-width: 640px) {
    text-align: left;
  }
`

const StyledBodySubText = styled.h3`
  max-width: 960px;
  line-height: 140%;
  font-size: 27px;
  opacity: 0.8;
  @media (max-width: 640px) {
    text-align: left;
  }
`

const StyledSectionTitle = styled.h3`
  max-width: 960px;
  line-height: 140%;
  font-size: 37px;
  @media (max-width: 640px) {
    text-align: left;
  }
`

const StyledProductImage = styled(Img)`
  width: 100%;
  max-width: 120px;
  margin-bottom: 2rem;
  background-color: none;
  border-radius: 12px;
`

const StyledSocialRow = styled.nav`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  & > *:not(:first-of-type) {
    margin-top: 0;
    margin-left: 16px;
  }
`

const StyledItemRow = styled.nav`
  display: flex;
  flex-direction: column;

  margin: 0rem;
  & > *:not(:first-of-type) {
    margin-top: 12px;
  }
  @media (min-width: 960px) {
    flex-direction: row;
    & > * {
      margin-bottom: 12px;
    }
    & > *:not(:first-of-type) {
      margin-top: 0;
      margin-left: 12px;
    }
  }
`

const StyledItemColumn = styled.nav`
  display: flex;
  flex-direction: column;

  & > *:not(:last-of-type) {
    margin-bottom: 12px;
  }
`

const StyledPinkGlimmer = styled(PinkGlimmer)`
  margin: 0;
  width: 48px;
  height: 48px;
  position: relative;
  top: -24px;
  right: -32px;
  margin-left: -50px;
  margin-right: 2px;
  transition: transform 0.2s linear;
  :hover {
    transform: rotate(-10deg);
  }
`

const StyledTwitter = styled(Twitter)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  width: 24px;
  height: 24px;
`

const StyledDiscord = styled(Discord)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  width: 24px;
  height: 24px;
`

const StyledGithub = styled(Github)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  width: 24px;
  height: 24px;
`
const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.cardBG};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  padding: 2rem;
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
`

const HideSmall = styled.span`
  @media (max-width: 960px) {
    display: none;
  }
`

const StyledTradeLink = styled.a`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  color: ${({ theme }) => theme.invertedTextColor};
  border-radius: 12px;
  display: inline-block;
  font-weight: 500;
  width: 100%;
  width: min-content;
  white-space: nowrap;
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: none;

  :hover,
  :focus {
    border: 1px solid white;
  }
  @media (max-width: 960px) {
    display: inline-block;
  }
`
const IndexPage = props => {
  const isDark = useDarkMode()

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      banner: file(relativePath: { eq: "Banner.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      grants: file(relativePath: { eq: "unigrants.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      discord: file(relativePath: { eq: "discord.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      twitter: file(relativePath: { eq: "twitter.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      reddit: file(relativePath: { eq: "reddit.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      discourse: file(relativePath: { eq: "discourse.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      devs: file(relativePath: { eq: "devs.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Layout path={props.location.pathname}>
      <SEO
        title="Home"
        path={props.location.pathname}
        description={'Swap, earn, and build on the leading decentralized crypto trading protocol.'}
      />
      <StyledBody>
        <StyledTitle>
          <StyledBodyTitle>
            <span style={{color: '#32F0C0'}}>THE FIRST</span>
            <div style={{marginTop: '30px'}}>FULL-FUNCTIONAL DEX</div>
            <div style={{color: '#32F0C0', marginTop: '30px', marginBottom: '30px'}}>on Aptos and Starcoin</div>
          </StyledBodyTitle>
          <StyledBodySubTitle>
            {'Swap, earn, and build on the leading decentralized crypto trading protocol.'}
          </StyledBodySubTitle>

          <StyledTradeLink
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid #32F0C0'
            }}
            target="_blank"
            href="https://starswap.xyz/"
          >
            Launch App
          </StyledTradeLink>
          <StyledSocialRow>
            <a href="http://t.me/StarswapEN" rel="noopener noreferrer" target="_blank">
              <img src={Telegram} style={{width: '24px', height: '24px', marginBottom: '0'}} />
            </a>
            <a href="https://twitter.com/StarswapEN">
              <StyledTwitter />
            </a>
            <a href="https://github.com/Elements-Studio">
              <StyledGithub />
            </a>
            <a href="https://discord.com/invite/96tKt5exaE">
              <StyledDiscord />
            </a>
          </StyledSocialRow>
        </StyledTitle>
        <EcosystemSection data={data} props={props} />
        <HideSmall>
          <StyledSectionHeader>
            <a target="_blank" rel="noreferrer" href="https://info.starswap.xyz/" style={{display: 'flex', justifyContent: 'flex-end'}}><img style={{ width: '70px', height: '70px', marginRight: '20px'}} src={BottomImage} /> PROTOCOL <span style={{color: '#32F0C0'}}>ANALYTICS</span></a>
            <img src={LineImage} />
          </StyledSectionHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '4rem 0 3rem 0'
            }}
          >
            <ProtocolData />
          </div>
        </HideSmall>
        <DeveloperSection data={data} props={props} />
      </StyledBody>
      {/* <BG /> */}
    </Layout>
  )
}

export default IndexPage

const StyledSectionHeader = styled.h1`
  font-size: 65px;
  white-space: wrap;
  overflow-wrap: normal;
  text-align: right;
  font-weight: 500;
  margin-top: 89px;

  a {
    color: ${({ theme }) => theme.textColor};
  }

  @media (max-width: 960px) {
    width: 100%;
    /* font-size: 2rem; */
    line-height: 2.5rem;
    max-width: 600px;
    margin-top: 4rem;
  }
  @media (max-width: 640px) {
    width: 100%;
    font-weight: 400;
    margin-top: 4rem;
    text-align: left;
  }
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;

  @media (max-width: 640px) {
    margin: 0;
  }
`

export const DeveloperCard = styled(StyledCard)`
  mix-blend-mode: overlay;
  background: url(${DevImage});
  color: white;
  background-size: cover;
  background-repeat: no-repeat;
`

export const GovernanceCard = styled(StyledCard)`
  mix-blend-mode: overlay;
  background: url(${GovImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 12px;
  @media (max-width: 960px) {
    margin-bottom: 12px;
    margin-right: 0px;
  }
`

export const AppsCard = styled(StyledCard)`
  background: url(${AppsImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 12px;
  width: 100%;
  min-height: 290px;
  max-width: 590px;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 0.25rem;
  }

  p {
    opacity: 0.6;
    font-size: 20px;
    font-weight: 300;
  }

  @media (max-width: 960px) {
    margin-bottom: 12px;
    margin-right: 0px;
    max-width: unset;
  }
`

export const GrantsCard = styled(StyledCard)`
  max-width: 375px;
  @media (max-width: 960px) {
    max-width: unset;
  }
`

const EcosystemSection = () => {
  return (
    <StyledSection>
      <StyledItemRow>
          <div style={{display: 'flex', width: '100%'}}>
          <StyledSectionHeader>
            <div style={{fontSize: '60px'}}>
              <div style={{display: 'flex'}}>STARSWAP <img style={{ width: '70px', height: '70px', marginLeft: '20px'}} src={RightImage} /></div>
              <div style={{color: '#32F0C0', textAlign: 'left'}}>ECOSYSTEM</div>
            </div>
          </StyledSectionHeader>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: '360px'}}>
            <StyledSectionTitle>A growing network of DeFi Apps.</StyledSectionTitle>
            <StyledBodySubText>
              Developers, traders, and liquidity providers participate together in a financial marketplace that is open
              and accessible to all.
            </StyledBodySubText>
          </div>
          </div>
        {/* <AppsCard>
          <h1>200+</h1>
          <p>DeFi Integrations</p>
        </AppsCard> */}
      </StyledItemRow>
    </StyledSection>
  )
}

const DeveloperSection = () => {
  return (
    <StyledSection style={{marginTop: '130px'}}>
      <StyledItemRow>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <StyledSectionHeader style={{marginTop: '0'}}>
            <div style={{fontSize: '60px', textAlign: 'left'}}>
              <div style={{display: 'flex'}}>DEVELOPER <img style={{ width: '70px', height: '70px', marginLeft: '20px'}} src={RightImage} /></div>
              <div style={{color: '#32F0C0'}}>DOCUMENTATION</div>
            </div>
          </StyledSectionHeader>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', marginLeft: '190px'}}>
            <StyledSectionTitle>Superpowers for DeFi developers.</StyledSectionTitle>
            <StyledBodySubText style={{ textAlign: 'left' }}>
              Starswap is a decentralized exchange (DEX) that is deployed in a smart contract network on the Starcoin block chain. 
            </StyledBodySubText>
            <StyledBodySubText style={{ textAlign: 'left' }}>
              Every wallet holder on the Starcoin can freely exchange tokens on the Starswap, and become an automated mark maker (AMM) by providing and staking liquidity.
            </StyledBodySubText>
          </div>
          </div>
        {/* <AppsCard>
          <h1>200+</h1>
          <p>DeFi Integrations</p>
        </AppsCard> */}
      </StyledItemRow>
    </StyledSection>
  )
}

// const DeveloperSection = props => {
//   return (
//     <>
//       <StyledSection>
//         <StyledSectionHeader>{'DEVELOPERS →'}</StyledSectionHeader>
//         <StyledItemRow>
//           <DeveloperCard
//             style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}
//           >
//             <StyledSectionTitle>Superpowers for DeFi developers.</StyledSectionTitle>
//             <StyledBodySubTitle style={{ fontSize: '20px' }}>
//               Starswap is a decentralized exchange (DEX) that is deployed in a smart contract network on the Starcoin block chain. Every wallet holder on the Starcoin can freely exchange tokens on the Starswap, and become an automated mark maker (AMM) by providing and staking liquidity.
//             </StyledBodySubTitle>

//             <Button target="_blank" href="https://docs.starswap.xyz/">
//               <p style={{ margin: 0 }}>
//                 {' '}
//                 <HideSmall>Developer</HideSmall> Documentation ↗
//               </p>
//             </Button>
//           </DeveloperCard>
//           {/* <GrantsCard>
//             <StyledProductImage fadeIn={false} fluid={props.data.grants.childImageSharp.fluid} />
//             <StyledBodySubTitle>Apply for the Starswap Developer Grants Program</StyledBodySubTitle>
//             <p>
//               Get paid to build the future of finance. Starswap Governance offers grant funding for people building apps,
//               tools, and activities on the Starswap Protocol.
//             </p>
//             <Button href="https://unigrants.org/" outlined>
//               <p style={{ margin: 0 }}>Learn more ↗</p>
//             </Button>
//           </GrantsCard> */}
//         </StyledItemRow>
//       </StyledSection>

//       {/* <StyledSection>
//         <StyledSectionHeader>{'GOVERNANCE →'}</StyledSectionHeader>
//         <StyledItemRow>
//           <GovernanceCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//             <span>
//               <StyledSectionTitle>Governed by the community.</StyledSectionTitle>
//               <StyledBodySubTitle style={{ fontSize: '20px' }}>
//                 The Starswap Protocol is governed by a decentralized community of UNI token holders and their delegates
//                 who propose and vote on upgrades to the protocol.
//               </StyledBodySubTitle>
//             </span>

//             <Button href="https://docs.starswap.xyz/protocol/concepts/governance/guide-to-voting" outlined>
//               <p style={{ margin: 0 }}>Read more </p>
//             </Button>
//           </GovernanceCard>
//           <StyledItemColumn style={{ display: 'flex', flexDirection: 'column' }}>
//             <Button style={{ borderRadius: '20px' }} href="https://gov.starswap.xyz" outlined>
//               <div style={{ padding: '1rem' }}>
//                 <StyledBodySubTitle style={{ marginBottom: '0.25rem' }}>
//                   Governance Forum <span style={{ fontSize: '16px' }}>↗</span>
//                 </StyledBodySubTitle>
//                 <p style={{ textAlign: 'left', margin: '0', opacity: '0.6', fontSize: '16px', fontWeight: 400 }}>
//                   Participate by proposing upgrades and discussing the future of the protocol with the Starswap
//                   community.
//                 </p>
//               </div>
//             </Button>
//             <Button style={{ borderRadius: '20px' }} href="https://sybil.org/" outlined>
//               <div style={{ padding: '1rem' }}>
//                 <StyledBodySubTitle style={{ marginBottom: '0.25rem' }}>
//                   Sybil <span style={{ fontSize: '16px' }}>↗</span>
//                 </StyledBodySubTitle>
//                 <p style={{ textAlign: 'left', margin: '0', opacity: '0.6', fontSize: '16px', fontWeight: 400 }}>
//                   Vote on offchain proposals with the Snapshot interface. Votes are weighted by the number of UNI
//                   delegates.
//                 </p>
//               </div>
//             </Button>
//             <Button style={{ width: '100%', borderRadius: '20px' }} href="https://app.starswap.xyz/#/vote" outlined>
//               <div style={{ padding: '1rem' }}>
//                 <StyledBodySubTitle style={{ marginBottom: '0.25rem' }}>
//                   Governance Portal <span style={{ fontSize: '16px' }}>↗</span>
//                 </StyledBodySubTitle>
//                 <p style={{ textAlign: 'left', margin: '0', opacity: '0.6', fontSize: '16px', fontWeight: 400 }}>
//                   Vote on official Starswap governance proposals and view past proposals.{' '}
//                 </p>
//               </div>
//             </Button>
//           </StyledItemColumn>
//         </StyledItemRow>
//       </StyledSection> */}
//     </>
//   )
// }
