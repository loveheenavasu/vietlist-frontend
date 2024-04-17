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
  setReview = 'set_review',
  getReview = 'get_review',
  SetStats = 'set_ad_stats',
  SetReviewReply = 'set_review_reply',
  GetReviewReply = 'get_review_reply',
  CancelMembership = 'cancel_membership_level',
  AllBookingsByEventId = 'get_booking_by_event_id',
  MyBookingsByUserId = 'get_event_booking_by_userid',
  CancelEventBooking = 'cancel_event_booking',
  Cancelpolicy = 'set_or_update_cancellation_policy',
  GetCancelpolicy = 'get_cancellation_policy',
  CreateBookingPaymentIntent = 'create_event_booking_initial_intent',
  StripePaymentForBooking = 'stripe_payment_for_booking',
  SetEventBooking = 'set_event_booking',
  BookingDetails = 'get_booking_by_booking_id',
  BusinessBlog = 'get_all_business_blog_post',
  UserBlogs = 'get_all_blog_post',
  UserBlogsDetail = 'get_blog_by_id',
  Contactus = 'contact_us',
  BlogCategory = 'get_blog_category',
  SetBlogComment = 'set_comment',
  GetBlogComment = 'get_comment',
  SetReplyBlog = 'set_comment_reply',
  BenefitsJoining = 'get_benifit_of_vietlist',
  // BusinessNotification = 'get_business_listing_notification',
  ClaimBusiness = 'set_business_listing_claim',
  GetBusinessLisitingClaim = 'get_business_listing_claim_status',
  BusinessNotification = 'get_notification',
  Faqs = 'faq_content_data',
  NotificationStatus = 'notification_status_update',
  ResourcesList = 'get_all_resources',
  ResourceDetail = 'get_resource_by_id',
  WebinarRegistration = 'set_webinar_regisration',
  BusinessVideoIntegration = 'business_listing_video_integration',
  // VideosType = 'get_business_listing_video_integration  ',
  AddSubscriber = 'add_subscriber',
  GetAllList = 'get_all_list',
  CreateListForSubscriber = 'create_list_for_subscriber',
  VideosType = 'get_business_listing_video_integration',
  DeleteVideoType = 'delete_business_listing_video',
  GetAllVideo = 'get_business_listing_video_integration',
  UpdateVideo = 'business_listing_video_update',
  GetSingleListSubscribers = 'get_single_list_subscribers',
  GetAllSubscribers = 'get_All_subscriber',
  CreateCoupon = 'set_business_coupon',
  GetCoupons = 'get_all_business_coupon',
  DeleteCoupon = 'delete_business_coupon',
  UpdateCoupon = 'update_business_coupon'
}
