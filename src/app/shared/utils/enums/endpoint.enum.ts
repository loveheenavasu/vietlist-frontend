export enum Endpoints {
  Login = 'login',
  Signup = 'register',
  SendOtp = 'sendotp',
  Forgotpassword = 'validateotp',
  ResetPassword = 'passwordreset',
  ProfileDetail = 'showuserprofile',
  SubscriptionPlan = 'pmprolevels',
  CreatePaymentIntent = 'create_initial_intent',
  Subscription = 'subscription',
  updateUserProfile = 'updateuserprofile',
  BusinessCategory = 'category_data_get',
  AddBusiness = 'business_data_set',
  Tags = 'tags_data_get',
  UpdateBusiness = 'business_data_update',
  BusinesssGet = 'get_business_by_post_id',
  DefaultCatApi = 'default_category_data_get',
  UploadMedia = 'uplaod_media',
  FindBusiness = 'business_data_search',
  GetBusinessByUserId = 'get_all_business_data_by_userid',
  ListingBusiness = 'get_publish_business_data',
  DeleteAddedBusiness = 'post_data_delete',
  TrendingBusiness = 'trending_data_get',
  HomePage = 'homepage_content',
  FooterContent = 'get_footer_data',
  SubscribeNewsletter = 'subscribe_newsletter',
  EventTags = 'event_tags_data_get',
  EventCatgeory = 'get_event_category',
  ChangePassword = "changepassword",
}
