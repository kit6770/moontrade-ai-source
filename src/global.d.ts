import {Key} from 'swr'
import {SWRMutationResponse} from 'swr/mutation'

declare module 'swr/mutation' {
  interface SWRMutationHook {
    <Data = unknown, Error = unknown, SWRMutationKey extends Key = Key, ExtraArg = unknown>(
      key: SWRMutationKey,
      fetcher?: (key: SWRMutationKey, {arg}: {arg: ExtraArg}) => Promise<Data>,
    ): SWRMutationResponse<Data, Error, SWRMutationKey, ExtraArg>
  }
}
