import { environment } from './../../../../environments/environment.development'

export class GenericHelper {
  protected static readonly baseUrl = environment.baseUrl

  public static appendBaseUrl(endpoint: string) {
    return `${this.baseUrl}${endpoint}`
  }
}
