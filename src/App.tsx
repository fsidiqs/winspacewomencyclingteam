import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router";
import SignIn from "./admin/pages/AuthPages/SignIn";
import SignUp from "./admin/pages/AuthPages/SignUp";
import NotFound from "./admin/pages/OtherPage/NotFound";
import UserProfiles from "./admin/pages/UserProfiles";
import Videos from "./admin/pages/UiElements/Videos";
import Images from "./admin/pages/UiElements/Images";
import Alerts from "./admin/pages/UiElements/Alerts";
import Badges from "./admin/pages/UiElements/Badges";
import Avatars from "./admin/pages/UiElements/Avatars";
import Buttons from "./admin/pages/UiElements/Buttons";
import LineChart from "./admin/pages/Charts/LineChart";
import BarChart from "./admin/pages/Charts/BarChart";
import Calendar from "./admin/pages/Calendar";
import BasicTables from "./admin/pages/Tables/BasicTables";
import FormElements from "./admin/pages/Forms/FormElements";
import Blank from "./admin/pages/Blank";
import AppLayout from "./admin/layout/AppLayout";
import { ScrollToTop } from "./admin/components/common/ScrollToTop";
import DashboardHome from "./admin/pages/Dashboard/Home";
import Home from "./pages/Home";
import { LanguageProvider } from "./context/LanguageContext";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Blogs from "./pages/Blogs";
import Races from "./pages/Races";
import TheTeam from "./pages/TheTeam";
import BlogView from "./pages/BlogView";
import Cyclist from "./pages/Cyclist";
import WrapperLayout from "./components/WrapperLayout";
import Gallery from "./pages/Gallery";
import Demo from "./admin/pages/Demo/Home";
import Index from "./posts-manager/pages/Index";
import Posts from "./posts-manager/pages/Posts";
import Equipment from "./pages/Equipment";
import EquipmentPage from "./pages/Equipment";
import DemoLayout from "./admin/layout/DemoLayout";
import UpdatePassword from "./admin/pages/AuthPages/UpdatePassword";
import MediaReviewsPage from "./pages/MediaReviewsPage";
import ForgotPassword from "./admin/pages/AuthPages/ForgotPassword";
import ConfirmmResetPassword from "./admin/pages/AuthPages/ConfirmResetPassword";
import RidersPage from "@/admin/pages/riders/RidersPage";
import PostsPage from "./posts-manager/pages/Posts";
import AddRidersPage from "@/admin/pages/riders/AddRidersPage";
import EditRidersPage from "@/admin/pages/riders/EditRidersPage";
import GalleryPage from "./pages/Gallery";
import AdminGalleryPage from "./posts-manager/pages/AdminGalleryPage";
import CreatePostPage from './posts-manager/pages/CreatePostPage';
import EditPostPage from './posts-manager/pages/EditPostPage';
import ManagementStaffDetails from './components/ManagementStaff/ManagementStaffDetails';
import ManagePagesPage from "./posts-manager/pages/ManagePages/ManagePagesPage";
import ManageHomepage from "./posts-manager/pages/ManagePages/Homepage/Homepage";

export default function App() {

  return (<LanguageProvider>
    <BrowserRouter>
      <Routes>

        <Route element={<DemoLayout />}>
          <Route index path="/demo" element={<Demo />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route index path="/wp-admin" element={<DashboardHome />} />
          <Route index path="/admin/pages" element={<ManagePagesPage />} />
          <Route index path="/admin/pages/home" element={<ManageHomepage />} />
          <Route index path="/admin/posts" element={<PostsPage />} />
          <Route path="/admin/posts/create" element={<CreatePostPage />} />
          <Route path="/admin/posts/:postId/edit" element={<EditPostPage />} />
          <Route index path="/admin/riders" element={<RidersPage />} />
          <Route index path="/admin/riders/create" element={<AddRidersPage />} />
          <Route index path="/admin/riders/:riderId/edit" element={<EditRidersPage />} />

          <Route index path="/admin/gallery" element={<AdminGalleryPage />} />

          {/* Others Page */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Ui Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/wos-connect" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ConfirmmResetPassword />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />

        {/* WrapperLayout for public routes */}
        <Route element={<WrapperLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/contacts" element={<ContactUs />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/reviews" element={<MediaReviewsPage />} />
          <Route path="/posts" element={<Blogs />} />
          <Route path="/races" element={<Races />} />
          <Route path="/posts/:postId/:postTitle" element={<BlogView />} />
          <Route path="/the-team" element={<TheTeam />} />
          <Route path="/the-team/:riderId" element={<Cyclist />} />
          <Route path="/management-staff/:staffId" element={<ManagementStaffDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </LanguageProvider>);
  // return (
  //   <>
  //     <Router>
  //       <ScrollToTop />
  //       <Routes>
  //         {/* Dashboard Layout */}
  //         <Route element={<AppLayout />}>
  //           <Route index path="/" element={<Home />} />

  //           {/* Others Page */}
  //           <Route path="/profile" element={<UserProfiles />} />
  //           <Route path="/calendar" element={<Calendar />} />
  //           <Route path="/blank" element={<Blank />} />

  //           {/* Forms */}
  //           <Route path="/form-elements" element={<FormElements />} />

  //           {/* Tables */}
  //           <Route path="/basic-tables" element={<BasicTables />} />

  //           {/* Ui Elements */}
  //           <Route path="/alerts" element={<Alerts />} />
  //           <Route path="/avatars" element={<Avatars />} />
  //           <Route path="/badge" element={<Badges />} />
  //           <Route path="/buttons" element={<Buttons />} />
  //           <Route path="/images" element={<Images />} />
  //           <Route path="/videos" element={<Videos />} />

  //           {/* Charts */}
  //           <Route path="/line-chart" element={<LineChart />} />
  //           <Route path="/bar-chart" element={<BarChart />} />
  //         </Route>

  //         {/* Auth Layout */}
  //         <Route path="/signin" element={<SignIn />} />
  //         <Route path="/signup" element={<SignUp />} />

  //         {/* Fallback Route */}
  //         <Route path="*" element={<NotFound />} />
  //       </Routes>
  //     </Router>
  //   </>
  // );
}
