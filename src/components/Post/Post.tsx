import React from "react";
import styles from "./Post.module.css";

// const Post: React.FC = () => (
//   <body
//     className="wp-singular post-template-default single single-post postid-41577 single-format-video wp-custom-logo wp-embed-responsive wp-theme-spin theme-spin hide_fixed_rows_enabled woocommerce-js tribe-js tinvwl-theme-style skin_default woo_extensions_present scheme_default blog_mode_post body_style_wide is_single single_style_style-5 sidebar_show sidebar_right sidebar_small_screen_below trx_addons_present header_type_custom header_style_header-custom-26010 header_position_default menu_side_none fixed_blocks_sticky elementor-default elementor-kit-15 e--ua-blink e--ua-chrome e--ua-webkit ua_retina ua_blink ua_webkit ua_chrome animate_to_inited added_to_cart_inited mobile_device desktop_layout">
//     <div className="body_wrap">
//       <div className="page_wrap">
//         <div className="page_content_wrap" >
//           <div className="content_wrap" >
//             <div className="post_header_wrap post_header_wrap_in_header post_header_wrap_style_style-5"
//             >
//               <div className="post_header post_header_single entry-header" >
//                 <div className="post_meta post_meta_categories" ><span
//                   className="post_meta_item post_categories"><a
//                     href="https://spin.axiomthemes.com/category/standard/"
//                     rel="category tag">Standard</a></span></div>
//                 <h1 className="post_title entry-title">All the greatest games in one video!</h1>
//                 <div className="post_meta post_meta_other" ><a
//                   className="post_meta_item post_author" rel="author"
//                   href="https://spin.axiomthemes.com/author/trx_admin/"><span
//                     className="post_author_by">By</span><span className="post_author_avatar"><img alt=""
//                       src="https://secure.gravatar.com/avatar/6f1eaa346f98eb2f6fd1f140671d9f641544fafc08cdccfb549e27fb3dbee2c2?s=56&amp;d=mm&amp;r=g"

//                       className="avatar avatar-56 photo" height="56" width="56"
//                       decoding="async" /></span><span className="post_author_name">Peter
//                         Bowman</span></a><span className="post_meta_item post_date">Sep
//                           21, 2023</span><a
//                             href="https://spin.axiomthemes.com/all-the-greatest-games-in-one-video/#respond"
//                             className="post_meta_item post_meta_comments icon-comment-light inited"><span
//                               className="post_meta_number">0</span><span
//                                 className="post_meta_label">Comments</span></a></div>
//               </div>
//             </div>
//           </div>
//           <div className="content_wrap" >


//             <div className="content" >
//               <a id="content_skip_link_anchor" className="spin_skip_link_anchor" href="#"></a>
//               <article id="post-41577"
//                 className="post_item_single post_type_post post_format_video post-41577 post type-post status-publish format-video has-post-thumbnail hentry category-standard tag-blog tag-news tag-premiere tag-sports post_format-post-format-video">
//                 <div className="post_header_wrap post_header_wrap_in_content post_header_wrap_style_style-5 with_featured_image"
//                 >
//                   <div className="post_featured alignwide with_thumb with_video hover_play"
//                   ><img loading="lazy" width="1920" height="1324"
//                     src="https://spin.axiomthemes.com/wp-content/uploads/2023/09/post14-copyright.jpg"
//                     className="attachment-full size-full" alt="" decoding="async"

//                     sizes="(max-width: 1920px) 100vw, 1920px" />
//                     <div className="post_video_hover inited"
//                       data-video="&lt;iframe allow=&quot;autoplay&quot; src=&quot;https://player.vimeo.com/video/239539114?h=&amp;autoplay=1&quot; width=&quot;840&quot; height=&quot;473&quot;&gt;&lt;/iframe&gt;"
//                     ></div>
//                     <div className="trx_addons_video_sticky trx_addons_intersection_inited trx_addons_in_viewport"
//                       id="io-53ac75d" >
//                       <div className="trx_addons_video_sticky_inner" >
//                         <h5 className="trx_addons_video_sticky_title">
//                           All the greatest games in one video!</h5>
//                         <div className="post_video video_frame" >
//                         </div>
//                       </div>
//                       <span className="trx_addons_video_sticky_close trx_addons_button_close inited"
//                       ><span className="trx_addons_button_close_icon"></span></span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="post_content post_content_single entry-content"
//                 >
//                   <p className="has-drop-cap">Proin faucibus nec mauris a sodales, sed elementum mi tincidunt.
//                     Sed eget
//                     viverra egestas nisi in consequat. Fusce sodales augue a accumsan. Cras
//                     sollicitudin, ipsum eget
//                     blandit pulvinar. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
//                     Aenean
//                     vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
//                     eleifend ac, enim.
//                   </p>
//                   <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
//                     doloremque
//                     laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi
//                     architecto
//                     beatae vitae dicta sunt, explicabo.</p>
//                   <h5 className="wp-block-heading">At vero eos et accusam</h5>
//                   <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
//                     doloremque
//                     laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi
//                     architecto
//                     beatae vitae dicta sunt.</p>
//                   <blockquote className="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
//                     <p>Curabitur varius eros et lacus rutrum consequat. Mauris sollicitudin enim
//                       condimentum, luctus
//                       enim justo non, molestie nisl. </p><cite>Peter Bowman</cite>
//                   </blockquote>
//                   <p>Ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque
//                     laudantium,
//                     totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto
//                     beatae vitae
//                     dicta sunt, explicabo.</p>
//                   <div aria-hidden="true" className="wp-block-spacer"
//                   ></div>
//                   <figure
//                     className="wp-block-embed is-type-video is-provider-vimeo wp-block-embed-vimeo wp-embed-aspect-16-9 wp-has-aspect-ratio">
//                     <div className="wp-block-embed__wrapper" >
//                       <iframe title="Cricket"
//                         src="https://player.vimeo.com/video/239539114?dnt=1&amp;app_id=122963"
//                         width="1290" height="726"
//                         allow="autoplay; fullscreen; picture-in-picture"
//                         className="spin_resize trx_addons_resize" data-last-width="679"

//                       ></iframe>
//                     </div>
//                   </figure>
//                   <h5 className="wp-block-heading">Creative approach to every project</h5>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
//                     incididunt ut
//                     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
//                     ullamco
//                     laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//                     reprehenderit. Lorem
//                     ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                   <p>Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, vel rutrum
//                     erat commodo
//                     ut. Praesent finibus congue euismod. Nullam scelerisque massa vel augue placerat, a
//                     tempor sem
//                     egestas. Curabitur placerat finibus lacus.</p>
//                 </div>
//                 <div className="post_footer post_footer_single entry-footer" >
//                   <div className="post_tags_single" ><span
//                     className="post_meta_label">Tags:</span> <a
//                       href="https://spin.axiomthemes.com/tag/blog/" rel="tag">blog</a><a
//                         href="https://spin.axiomthemes.com/tag/news/" rel="tag">news</a><a
//                           href="https://spin.axiomthemes.com/tag/premiere/" rel="tag">premiere</a><a
//                             href="https://spin.axiomthemes.com/tag/sports/" rel="tag">sports</a></div>
//                   <div className="post_meta post_meta_single" ><a href="#"
//                     className="post_meta_item post_meta_likes trx_addons_icon-heart-empty enabled inited"
//                     title="Like" data-postid="41577" data-likes="0" data-title-like="Like"
//                     data-title-dislike="Dislike"><span className="post_meta_number">0</span><span
//                       className="post_meta_label">Likes</span></a><span
//                         className="post_meta_item post_share"><span
//                           className="socials_share socials_size_tiny socials_type_block socials_dir_horizontal socials_wrap"><span
//                             className="social_items inited"><a className="social_item social_item_popup"
//                               href="//twitter.com/intent/tweet?text=All+the+greatest+games+in+one+video%21&amp;url=https%3A%2F%2Fspin.axiomthemes.com%2Fall-the-greatest-games-in-one-video%2F"
//                               data-link="//twitter.com/intent/tweet?text=All the greatest games in one video!&amp;url=https%3A%2F%2Fspin.axiomthemes.com%2Fall-the-greatest-games-in-one-video%2F"
//                               data-count="twitter-new"><span
//                                 className="social_icon social_icon_twitter-new sc_icon_type_icons"
//                               ><span className="icon-twitter-new"></span></span></a><a
//                                 className="social_item social_item_popup"
//                                 href="//www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fspin.axiomthemes.com%2Fall-the-greatest-games-in-one-video%2F"
//                                 data-link="//www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fspin.axiomthemes.com%2Fall-the-greatest-games-in-one-video%2F"
//                                 data-count="facebook-1"><span
//                                   className="social_icon social_icon_facebook-1 sc_icon_type_icons"
//                                 ><span className="icon-facebook-1"></span></span></a><a
//                                   className="social_item"
//                                   href="mailto:test@fwe.com?subject=All%20the%20greatest%20games%20in%20one%20video!&amp;body=https%3A%2F%2Fspin.axiomthemes.com%2Fall-the-greatest-games-in-one-video%2F"
//                                   target="_blank" data-count="share-email"><span
//                                     className="social_icon social_icon_share-email sc_icon_type_icons"
//                                   ><span className="icon-share-email"></span></span></a><a
//                                     className="social_item" title="Copy URL to clipboard"
//                                     data-message="Copied!"
//                                     data-copy-link-url="https://spin.axiomthemes.com/all-the-greatest-games-in-one-video/"
//                                     nopopup="true" href="#" target="_blank" data-count="link"><span
//                                       className="social_icon social_icon_link sc_icon_type_icons"
//                                     ><span
//                                       className="icon-link"></span></span></a></span></span></span>
//                   </div>
//                   <div className="nav-links-single" >

//                     <nav className="navigation post-navigation" aria-label="Posts">
//                       <h2 className="screen-reader-text">Post navigation</h2>
//                       <div className="nav-links" >
//                         <div className="nav-previous" ><a
//                           href="https://spin.axiomthemes.com/what-do-we-like-about-cricket/"
//                           rel="prev"><span className="nav-arrow-label">Previous</span>
//                           <h6 className="post-title">What do we like about cricket?</h6><span
//                             className="post_date">Sep 21, 2023</span>
//                         </a></div>
//                         <div className="nav-next" ><a
//                           href="https://spin.axiomthemes.com/the-art-of-playing-cricket-professionally/"
//                           rel="next"><span className="nav-arrow-label">Next</span>
//                           <h6 className="post-title">The art of playing cricket professionally
//                           </h6><span className="post_date">Sep 21, 2023</span>
//                         </a></div>
//                       </div>
//                     </nav>
//                   </div>

//                   <div className="author_info author vcard" itemscope="itemscope"
//                     itemtype="https://schema.org/Person" >

//                     <div className="author_avatar"  >
//                       <a className="author_avatar_link"
//                         href="https://spin.axiomthemes.com/author/trx_admin/">
//                         <img alt=""
//                           src="https://secure.gravatar.com/avatar/6f1eaa346f98eb2f6fd1f140671d9f641544fafc08cdccfb549e27fb3dbee2c2?s=120&amp;d=mm&amp;r=g"

//                           className="avatar avatar-120 photo" height="120" width="120"
//                           decoding="async" /> </a>
//                     </div><!-- .author_avatar -->

//                     <div className="author_description" >
//                       <h5 className="author_title" ><a className="author_link fn"
//                         href="https://spin.axiomthemes.com/author/trx_admin/" rel="author">Peter
//                         Bowman</a>
//                       </h5>
//                       <div className="author_label" >About Author</div>
//                       <div className="author_bio"  >
//                         <p>Phasellus et ipsum justo. Aenean fringilla a fermentum mauris non
//                           venenatis. Praesent
//                           at nulla aliquam ligula.</p>
//                         <div className="author_links" >
//                           <div className="socials_wrap" ><a target="_blank"
//                             href="https://www.facebook.com/AxiomThemes-505060569826537/"
//                             className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons"><span
//                               className="social_icon social_icon_facebook-1" ><span
//                                 className="icon-facebook-1"></span></span></a><a
//                                   target="_blank" href="https://twitter.com/ThemesAxiom/"
//                                   className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons"><span
//                                     className="social_icon social_icon_twitter-new" ><span
//                                       className="icon-twitter-new"></span></span></a><a
//                                         target="_blank" href="https://dribbble.com/axiomthemes/"
//                                         className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons"><span
//                                           className="social_icon social_icon_dribble-new" ><span
//                                             className="icon-dribble-new"></span></span></a><a
//                                               target="_blank" href="https://www.instagram.com/axiom_themes/"
//                                               className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons"><span
//                                                 className="social_icon social_icon_instagram" ><span
//                                                   className="icon-instagram"></span></span></a></div>
//                         </div>
//                       </div>
//                     </div>

//                   </div><!-- .author_info -->
//                 </div>
//               </article>
//               <section className="comments_wrap opened">
//                 <div className="comments_form_wrap" >
//                   <div className="comments_form" >
//                     <div id="respond" className="comment-respond" >
//                       <h3 id="reply-title"
//                         className="section_title comments_form_title comment-reply-title">Leave a
//                         comment <small><a rel="nofollow" id="cancel-comment-reply-link"
//                           href="/all-the-greatest-games-in-one-video/#respond"
//                           className="inited">Cancel reply</a></small></h3>
//                       <form action="https://spin.axiomthemes.com/wp-comments-post.php" method="post"
//                         id="commentform" className="comment-form inited_validation" novalidate=""
//                         data-inited-validation="1">
//                         <div className="comments_field comments_author" ><label
//                           for="author" className="required">Name</label><span
//                             className="sc_form_field_wrap"><input id="author" name="author"
//                               type="text" placeholder="Your Name *" value=""
//                               aria-required="true" className="fill_inited"></span></div>
//                         <div className="comments_field comments_email" ><label
//                           for="email" className="required">E-mail</label><span
//                             className="sc_form_field_wrap"><input id="email" name="email"
//                               type="text" placeholder="Your E-mail *" value=""
//                               aria-required="true" className="fill_inited"></span></div>
//                         <p className="comment-form-cookies-consent"><input
//                           id="wp-comment-cookies-consent" name="wp-comment-cookies-consent"
//                           type="checkbox" value="yes"> <label
//                             for="wp-comment-cookies-consent">Save my name, email, and website in
//                             this
//                             browser for the next time I comment.</label></p>
//                         <div className="comments_field comments_comment" ><label
//                           for="comment" className="required">Comment</label><span
//                             className="sc_form_field_wrap"><textarea id="comment" name="comment"
//                               placeholder="Your comment *" aria-required="true"
//                               className="fill_inited"></textarea></span></div>
//                         <div className="comments_field comments_i_agree_privacy_policy"
//                         ><span className="sc_form_field_wrap"><input
//                           id="i_agree_privacy_policy" name="i_agree_privacy_policy"
//                           type="checkbox" value="1" className="inited">
//                           <label for="i_agree_privacy_policy" className="optional">I agree that my
//                             submitted
//                             data is being collected and stored.</label></span></div>
//                         <p className="form-submit"><input name="submit" type="submit" id="send_comment"
//                           className="submit" value="Leave a comment"> <input type="hidden"
//                             name="comment_post_ID" value="41577" id="comment_post_ID">
//                             <input type="hidden" name="comment_parent" id="comment_parent"
//                               value="0">
//                             </p>
//                           </form>
//                         </div><!-- #respond -->
//                         </div>
//                     </div>
//                   </section>
//                   <section className="related_wrap related_position_below_content related_style_classic">


//                     <h3 className="section_title related_wrap_title">You May Also Like</h3>
//                     <div className="columns_wrap posts_container columns_padding_bottom inited_open_full_post"
//                     >
//                       <div className="column-1_2" >
//                         <div id="post-41573"
//                           className="related_item post_format_standard post-41573 post type-post status-publish format-standard hentry category-standard tag-blog tag-news tag-premiere tag-sports"
//                           data-post-id="41573" >
//                           <div className="post_header entry-header" >
//                             <div className="post_meta post_meta_categories" ><span
//                               className="post_meta_item post_categories cat_sep"><a
//                                 href="https://spin.axiomthemes.com/category/standard/"
//                                 rel="category tag">Standard</a></span></div>
//                             <h6 className="post_title entry-title"><a
//                               href="https://spin.axiomthemes.com/how-to-keep-your-skills-high-and-sharp/">How
//                               to keep your skills high and sharp?</a></h6>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 </div>
//                 <div className="sidebar widget_area
// 			 right sidebar_below sidebar_default scheme_default		" role="complementary" ">
//                 <a id="sidebar_skip_link_anchor" className="spin_skip_link_anchor" href="#"></a>
//                 <div className="sidebar_inner" >
//                   <aside className="widget widget_search">
//                     <h5 className="widget_title">Search</h5>
//                     <form role="search" method="get" className="search-form"
//                       action="https://spin.axiomthemes.com/" data-inited-validation="1">
//                       <label>
//                         <span className="screen-reader-text">Search for:</span>
//                         <input type="search" className="search-field fill_inited" placeholder="Search …"
//                           value="" name="s">
//                       </label>
//                       <input type="submit" className="search-submit" value="Search">
//                     </form>
//                   </aside>
//                   <aside className="widget widget_recent_posts">
//                     <h5 className="widget_title">Recent Posts</h5>
//                     <article className="post_item with_thumb">
//                       <div className="post_thumb hover_zoom" ><a
//                         href="https://spin.axiomthemes.com/the-art-of-playing-cricket-professionally/"><img
//                           width="120" height="120"
//                           src="https://spin.axiomthemes.com/wp-content/uploads/2023/09/post6-copyright-120x120.jpg"
//                           className="attachment-spin-thumb-tiny size-spin-thumb-tiny wp-post-image"
//                           alt="The art of playing cricket professionally" decoding="async"

//                           sizes="(max-width: 120px) 100vw, 120px" /></a></div>
//                       <div className="post_content" >
//                         <div className="post_info" >
//                           <div className="post_info_item post_categories" ><a
//                             href="https://spin.axiomthemes.com/category/standard/"
//                             title="View all posts in Standard">Standard</a></div><span
//                               className="post_info_item post_info_posted"><a
//                                 href="https://spin.axiomthemes.com/the-art-of-playing-cricket-professionally/"
//                                 className="post_info_date">Sep 21, 2023</a></span>
//                         </div>
//                         <h6 className="post_title"><a
//                           href="https://spin.axiomthemes.com/the-art-of-playing-cricket-professionally/">The
//                           art of playing cricket professionally</a></h6>
//                       </div>
//                     </article>
//                     <article className="post_item with_thumb">
//                       <div className="post_thumb hover_zoom" ><a
//                         href="https://spin.axiomthemes.com/all-the-greatest-games-in-one-video/"><img
//                           width="120" height="120"
//                           src="https://spin.axiomthemes.com/wp-content/uploads/2023/09/post14-copyright-120x120.jpg"
//                           className="attachment-spin-thumb-tiny size-spin-thumb-tiny wp-post-image"
//                           alt="All the greatest games in one video!" decoding="async"

//                           sizes="(max-width: 120px) 100vw, 120px" /></a></div>
//                       <div className="post_content" >
//                         <div className="post_info" >
//                           <div className="post_info_item post_categories" ><a
//                             href="https://spin.axiomthemes.com/category/standard/"
//                             title="View all posts in Standard">Standard</a></div><span
//                               className="post_info_item post_info_posted"><a
//                                 href="https://spin.axiomthemes.com/all-the-greatest-games-in-one-video/"
//                                 className="post_info_date">Sep 21, 2023</a></span>
//                         </div>
//                         <h6 className="post_title"><a
//                           href="https://spin.axiomthemes.com/all-the-greatest-games-in-one-video/">All
//                           the
//                           greatest games in one video!</a></h6>
//                       </div>
//                     </article>
//                   </aside>
//                   <aside className="widget trx_addons_show_on_permanent widget_banner"><a
//                     href="https://spin.axiomthemes.com/shop/" className="image_wrap"><img
//                       src="//spin.axiomthemes.com/wp-content/uploads/2023/09/banner-copyright.jpg"
//                       alt="" width="300" height="250" /></a></aside>
//                 </div>
//             </div>
//             <div className="clearfix" ></div>
//           </div>
//         </div>

//       </div>
//     </div>
//   </body>

// );

// export default Post;
