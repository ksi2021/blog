import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

import Header from './components/header/header';
import RegistrationForm from './components/pages/register/register';
import LoginForm from './components/pages/login/login';
import ProfileForm from './components/pages/profile/profile';
import ArticleForm from './components/pages/createArticle/ArticleForm';
import ArticlePage from './components/pages/article/articlePage';
import ArticleList from './components/articleList/articleList';
import { getArticles } from './components/store/articleReducer';
import { authorise } from './components/store/userReducer';
import ErrorBaundary from './components/errorBoundary/errorBaundary';

function App({ flag }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorise());
  }, []);

  useEffect(() => {
    dispatch(getArticles());
  }, [flag]);

  return (
    <div className="App">
      <ErrorBaundary>
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
            <Route path={'/new-article'} element={<ArticleForm />} />
            <Route
              path={'/articles/:slug/edit'}
              element={<ArticleForm isEdit={true} />}
            />

            <Route path={'*'} element={<h1>path not found</h1>} />
          </Routes>
        </BrowserRouter>
      </ErrorBaundary>
    </div>
  );
}

const mapStateToProps = (state) => ({ flag: state.article.articleFlag });

export default connect(mapStateToProps)(App);
