import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';

import Header from './components/header/header';
import RegistrationForm from './components/pages/register/register';
import LoginForm from './components/pages/login/login';
import ProfileForm from './components/pages/profile/profile';
import ArticleForm from './components/pages/createArticle/ArticleForm';
import ArticlePage from './components/pages/article/articlePage';
import PopUP from './components/popup';
import ArticleList from './components/articleList/articleList';
import { getArticles } from './components/store/articleReducer';
import { authorise } from './components/store/userReducer';
import ErrorBaundary from './components/errorBoundary/errorBaundary';


function App({ flag, page }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorise());
  }, []);

  useEffect(() => {
    dispatch(getArticles(page));
  }, [flag]);

  return (
    <div className="App">
      <ErrorBaundary>
        <SkeletonTheme baseColor="#778899" highlightColor="#444">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path={'/'} element={<ArticleList />}>
                <Route path={'/articles'} element={<ArticleList />} />
              </Route>
              <Route path={'/article/:slug'} element={<ArticlePage />} />
              <Route path={'/sign-in'} element={<LoginForm />} />
              <Route path={'/sign-up'} element={<RegistrationForm />} />
              <Route path={'/profile'} element={<ProfileForm />} />
              <Route
                path={'/new-article'}
                element={<ArticleForm isEdit={false} />}
              />
              <Route
                path={'/articles/:slug/edit'}
                element={<ArticleForm isEdit={true} />}
              />
              <Route path={'*'} element={<h1>Page not found</h1>} />
            </Routes>
          </BrowserRouter>
        </SkeletonTheme>
      </ErrorBaundary>
    </div>
  );
}

const mapStateToProps = (state) => ({
  flag: state.article.articleFlag,
  page: state.article.page
});

export default connect(mapStateToProps)(App);
