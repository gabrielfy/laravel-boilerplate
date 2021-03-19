type LangProps = {
  name: string
  url: string
}

export default {
  en: {
    name: 'English',
    url: '/img/flags/us.svg'
  },
  pt_BR: {
    name: 'Portuguese',
    url: '/img/flags/br.svg'
  }
} as {
  [key: string]: LangProps
}
