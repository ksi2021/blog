import { connect } from 'react-redux';

import Article from '../article/article';
import ArticlePagination from '../pagination/pagination';
import SkeletonArticleList from '../skeleton/articleList';
import { setPage } from '../store/articleReducer';

function ArticleList({
  articles,
  page,
  articlesCount,
  authorization,
  loading,
}) {
  if (loading) return <SkeletonArticleList />;
  if (!articles?.length) return <h1>articles not found</h1>;
  return (
    <div>
      {articles.map((el) => (
        <Article key={el.slug} {...el} authorization={authorization} />
      ))}
      <ArticlePagination
        currentPage={page}
        totalPages={articlesCount}
        setPage={setPage}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    articles: state.article.articles,
    page: state.article.page,
    loading: state.article.loading,
    articlesCount: state.article.articlesCount,
    authorization: state.user.authorization,
  };
};
export default connect(mapStateToProps, { setPage })(ArticleList);
