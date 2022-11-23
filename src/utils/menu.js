const menu = [
  {
    name: 'Docs',
    color: '#32F0C0',
    link: 'https://docs.starswap.xyz/'
  },
  { name: 'GitHub', link: 'https://github.com/Elements-Studio' },
  // {
  //   name: 'Developers',
  //   sublinks: [
  //     {
  //       name: 'Docs',
  //       link: 'https://docs.starswap.xyz/'
  //     },
  //     { name: 'GitHub', link: 'https://github.com/Elements-Studio' },
  //   ]
  // },
  // {
  //   name: 'Governance',
  //   sublinks: [
  //     {
  //       name: 'UNI Token ',
  //       link: '/blog/uni'
  //     },
  //     { name: 'Governance Forum', link: 'https://gov.starswap.xyz/' },
  //     { name: 'Sybil (Delegates)', link: 'https://sybil.org/' },
  //     { name: 'Voting Portal', link: 'https://app.starswap.xyz/#/vote' },
  //     { name: 'Documentation', link: '/docs/v2/governance/overview' }
  //   ]
  // },
  {
    name: 'Community',
    sublinks: [
      { name: 'Discord', link: 'https://discord.com/invite/96tKt5exaE' },
      { name: 'Twitter', link: 'https://twitter.com/StarswapEN' },
      { name: 'Telegram', link: 'https://t.me/StarswapEN' }
    ]
  },
  {
    name: 'More',
    sublinks: [
      {
        name: 'About',
        link: '/about'
      },
      {
        name: 'FAQ',
        link: '/faq'
      }
      // {
      //   name: 'Help & Tutorials',
      //   link: 'https://help.starswap.xyz/'
      // },
      // {
      //   name: 'Logo & Brand',
      //   link: '/about#brand'
      // }
    ]
  }
]

module.exports = menu
