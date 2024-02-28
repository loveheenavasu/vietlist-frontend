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
  FindEvent = 'search_event_data',
  GetBusinessByUserId = 'get_all_business_data_by_userid',
  ListingBusiness = 'get_publish_business_data',
  DeleteAddedBusiness = 'post_data_delete',
  TrendingBusiness = 'trending_data_get',
  HomePage = 'homepage_content',
  FooterContent = 'get_footer_data',
  SubscribeNewsletter = 'subscribe_newsletter',
  EventTags = 'event_tags_data_get',
  EventCatgeory = 'get_event_category',
  EventDetailsByPostId = 'get_event_using_postid',
  GetPublishEvent = 'get_publish_event',
  ChangePassword = 'changepassword',
  DeleteAccount = 'delete_user_account',
  NotificaionAllow = 'profile_notification_setting',
  FreeSubscriptionAPI = 'subscription',
  GetNotificationsetting = 'get_profile_notification_setting',
  UserSubscriptionDetails = 'user_subscription_detail_get',
  ListingPrivacySet = 'listing_privacy_set',
  GetSetPrivacy = 'listing_privacy_get',
  GetAds = 'get_all_ad',
  GetSpaces = 'get_ad_spaces',
  CreateAd = 'create_ad',
  GetAdById = 'get_ad_by_id',
  UpdateAd = 'update_ad',
  DeleteAd = 'delete_ad',
  GetAdByUserId = 'get_user_ad_stats',
  SetBillingAddress = 'user_billing_address_set',
  GetBillingDetails = 'user_billing_address_get',
  ShowAd = 'get_ad_and_space_data',
  AddEvent = 'set_event',
  UpdateEvent = 'update_event',
  GetEventUsingUserId = 'get_event_using_userid',
  DeleteEvent = 'delete_event',
  EditEvent = 'update_event',
  GetAllEvents = 'get_event_using_userid',
  GetEventDetailsByID = 'get_event_using_postid',
  setReview='set_review',
  getReview='get_review'
}
