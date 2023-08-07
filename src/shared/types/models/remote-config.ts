export type RemoteConfigType = 'string' | 'boolean' | 'number' | 'json'

export type RemoteConfig = {
  id: string
  key: string
  type: RemoteConfigType
  value: string
  active: boolean
}
