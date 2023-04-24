import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NewPost from "./pages/NewPost/NewPost";
import EditPost from "./pages/EditPost/EditPost";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import EditUserProfile from "./pages/EditUserProfile/EditUserProfile";
import Notifications from "./pages/Notifications/Notifications";
import MainNavigation from "./components/MainNavigation/MainNavigation.js";
import Tags from "./components/Tags/Tags";
import Cv from "./pages/Cv/Cv";
import Tag from "./pages/Tag/Tag";
import Post from "./pages/Post/Post";
import SearchResults from "./pages/SearchResults/SearchResults";
import ReadingList from "./pages/ReadingList/ReadingList";
import HrAdmin from "./pages/HrAdmin/HrAdmin";
import Application from "./pages/HrAdmin/Apllication";
import Footer from "./components/Footer/Footer";
import { AuthContext } from "./context/auth";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ComapnyList from "./pages/Companies/Companies";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import MyApplication from "./pages/MyApplication/MyAppication";

const MainRouter = ({ token }) => {
  let routes;
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    routes = (
      <>
        <MainNavigation />

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/hradmin" exact>
            <HrAdmin />
          </Route>
          <Route path="/hradmin/applications/:jobId" exact>
            <Application />
          </Route>
          <Route path="/users/:userId" exact>
            <UserProfile />
          </Route>
          <Route path="/users/:userId/edit" exact>
            <EditUserProfile />
          </Route>
          <Route path="/users/:userId/readinglist" exact>
            <ReadingList />
          </Route>
          <Route path="/companies" exact>
            <ComapnyList />
          </Route>
          <Route path="/companies/:companyId" exact>
            <CompanyProfile />
          </Route>
          <Route path="/users/:userId/notifications" exact>
            <Notifications />
          </Route>
          <Route path="/auth" exact>
            <Auth newUser={false} />
          </Route>
          <Route path="/tags" exact>
            <Tags />
          </Route>
          <Route path="/tags/:tagName" exact>
            <Tag />
          </Route>
          <Route path="/cvs/:userId" exact>
            <Cv />
          </Route>
          <Route path="/applications/:userId" exact>
            <MyApplication />
          </Route>
          <Route path="/search/" exact>
            <SearchResults />
          </Route>
          <Route path="/posts/new" exact>
            <NewPost />
          </Route>
          <Route path="/posts/:titleURL/:postId" exact>
            <Post />
          </Route>
          <Route path="/posts/:titleURL/:postId/edit" exact>
            <EditPost />
          </Route>
          <Redirect to="/auth" />
        </Switch>
        <Footer />
      </>
    );
  } else {
    routes = (
      <>
        <MainNavigation />
        {/* <ScrollToTop /> */}

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth/new-user" exact>
            <Auth newUser={true} />
          </Route>
          <Route path="/auth" exact>
            <Auth newUser={false} />
          </Route>
          <Route path="/tags" exact>
            <Tags />
          </Route>
          <Route path="/tags/:tagName" exact>
            <Tag />
          </Route>
          <Route path="/search/" exact>
            <SearchResults />
          </Route>
          <Route path="/users/:userId" exact>
            <UserProfile />
          </Route>
          <Route path="/posts/:titleURL/:postId" exact>
            <Post />
          </Route>
          <Route path="/companies" exact>
            <ComapnyList />
          </Route>
          <Route path="/companies/:companyId" exact>
            <CompanyProfile />
          </Route>
          <Redirect to="/auth" />
        </Switch>
        <Footer />
      </>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      {routes}
    </Router>
  );
};

export default MainRouter;
