import componentMetadata from '@primer/component-metadata'
import {Box, Heading, Text, Label, StyledOcticon} from '@primer/react'
import {AccessibilityInsetIcon} from '@primer/octicons-react'
import React from 'react'
import Head from './head'
import Header, {HEADER_HEIGHT} from './header'
import PageFooter from './page-footer'
import Sidebar from './sidebar'
import SourceLink from './source-link'
import RailsLink from './rails-link'
import ReactLink from './react-link'
import StatusLabel from './status-label'
import LookbookLink from './lookbook-link'
import StorybookLink from './storybook-link'
import FigmaLink from './figma-link'
import TableOfContents from './table-of-contents'

function Layout({children, pageContext}) {
  let {
    title,
    description,
    figma,
    react,
    status,
    a11yReviewed,
    source,
    rails,
    storybook,
    lookbook,
    additionalContributors,
    componentId
  } = pageContext.frontmatter

  if (!additionalContributors) {
    additionalContributors = []
  }

  const component = componentMetadata.components[componentId]

  // Auto-populate title and description using component metadata
  if (component) {
    title ||= component.displayName
    description ||= component.description
  }

  return (
    <Box sx={{flexDirection: 'column', minHeight: '100vh', display: 'flex'}}>
      <Head title={title} description={description} />
      <Header />
      <Box css={{zIndex: 0}} sx={{flex: '1 1 auto', flexDirection: 'row', display: 'flex'}}>
        <Box sx={{display: ['none', null, null, 'block']}}>
          <Sidebar />
        </Box>
        <Box
          id="skip-nav"
          sx={{
            justifyContent: 'center',
            flexDirection: 'row-reverse',
            display: 'flex',
            width: '100%',
            p: [4, 5, 6, 7]
          }}
        >
          {pageContext.tableOfContents.items ? (
            <Box
              sx={{
                width: 220,
                flex: '0 0 auto',
                marginLeft: 6,
                display: ['none', null, 'block'],
                position: 'sticky',
                top: HEADER_HEIGHT + 48,
                maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 48px)`
              }}
              css={{gridArea: 'table-of-contents', overflow: 'auto'}}
            >
              <Text sx={{display: 'inline-block', fontWeight: 'bold', pl: 3}} id="toc-heading">
                On this page
              </Text>
              <TableOfContents aria-labelledby="toc-heading" items={pageContext.tableOfContents.items} />
            </Box>
          ) : null}
          <Box sx={{width: '100%', maxWidth: '960px'}}>
            <Box sx={{mb: 7}}>
              <Box sx={{alignItems: 'center', display: 'flex'}}>
                <Heading as="h1" sx={{mb: 2}}>
                  {title}
                </Heading>{' '}
              </Box>
              {description ? <Box sx={{fontSize: 3, mb: 3}}>{description}</Box> : null}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: 3,
                  rowGap: 3,
                  alignItems: 'center',
                  fontSize: 1
                }}
              >
                {status ? (
                  <Box as={'ul'} sx={{display: 'flex', gap: 1, alignItems: 'center', m: 0, p: 0, paddingInline: 0}}>
                    <StatusLabel size="large" status={status} />
                    {a11yReviewed ? (
                      <Label
                        as={'li'}
                        size="large"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          backgroundColor: 'done.subtle',
                          fontWeight: 'normal',
                          borderColor: 'transparent'
                        }}
                      >
                        <StyledOcticon icon={AccessibilityInsetIcon} sx={{fill: 'done.fg'}} />
                        Reviewed by accessibility team
                      </Label>
                    ) : (
                      <Label
                        size="large"
                        as={'li'}
                        sx={{
                          backgroundColor: 'neutral.subtle',
                          fontWeight: 'normal',
                          borderColor: 'transparent'
                        }}
                      >
                        Review pending by accessibility team
                      </Label>
                    )}
                  </Box>
                ) : null}
                {source || storybook || lookbook || figma || rails || react ? (
                  <Box
                    as={'ul'}
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 3,
                      alignItems: 'center',
                      m: 0,
                      p: 0,
                      paddingInline: 0,
                      listStyle: 'none'
                    }}
                  >
                    {source ? <SourceLink href={source} /> : null}
                    {lookbook ? <LookbookLink href={lookbook} /> : null}
                    {storybook ? <StorybookLink href={storybook} /> : null}
                    {figma ? <FigmaLink href={figma} /> : null}
                    {react ? <ReactLink href={react} /> : null}
                    {rails ? <RailsLink href={rails} /> : null}
                  </Box>
                ) : null}
              </Box>
            </Box>
            {pageContext.tableOfContents.items ? (
              <Box
                sx={{
                  display: ['block', null, 'none'],
                  mb: 5,
                  borderColor: 'border.muted',
                  bg: 'canvas.subtle',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: 2
                }}
              >
                <Box sx={{px: 3, py: 2}}>
                  <Box
                    sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}
                  >
                    <Text sx={{fontWeight: 'bold'}}>On this page</Text>
                  </Box>
                </Box>
                <Box sx={{borderTop: '1px solid', borderColor: 'border.muted'}}>
                  <TableOfContents items={pageContext.tableOfContents.items} />
                </Box>
              </Box>
            ) : null}
            {children}
            <PageFooter
              editUrl={pageContext.editUrl}
              contributors={pageContext.contributors.concat(additionalContributors.map(login => ({login})))}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
