import * as db from "../utils/db-util";

const getArticleList = async (
  limit: number,
  offset: number,
  desc?: boolean
) => {
  const _sql = `SELECT article.id, title, content, group_concat(tag.name) tags, article.created_at createdAt
                FROM tag, article,tag_article
                WHERE tag.id IN (
                    SELECT tag_article.tag_id
                    WHERE tag_article.article_id = article.id
                      AND tag_article.tag_id = tag.id
                    )
                GROUP BY article.id
                ORDER BY article.created_at DESC
                LIMIT ? OFFSET ?;`;
  return db.query(_sql, [limit, offset]);
};

const getArticleById = async (id: number) => {
  let _sql = `SELECT article.id, title, content, group_concat(tag.name) tags, article.created_at createdAt
              FROM tag, article,tag_article
              WHERE tag.id IN (
                  SELECT tag_article.tag_id
                  WHERE tag_article.article_id = article.id
                    AND tag_article.tag_id = tag.id
                    AND article.id=?
                  )
              GROUP BY article.id`;

  return db.query(_sql, [id]);
};

const insert = async (title: string, content: string) => {
  const _sql = `INSERT INTO article(title, content) VALUES(?, ?)`;
  return db.query(_sql, [title, content]);
};

const update = async (id: number, title: string, content: string) => {
  const _sql = `UPDATE article SET title=?, content=? WHERE id=?`;
  return db.query(_sql, [title, content, id]);
};

const _delete = async (id: number) => {
  try {
    const _sql = `DELETE FROM article WHERE id = ?`;
    const res = await db.query(_sql, [id, id]);
    console.log("res", res);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log("error", error);
  }
};

const addTagArticle = async (tagName: string, articleId: number) => {
  const _sql = `INSERT INTO tag_article(tag_id, article_id) 
                VALUES((SELECT tag.id FROM tag WHERE name=?),?)`;
  return db.query(_sql, [tagName, articleId]);
};

const deleteTagArticleById = async (articleId: number) => {
  const _sql = `DELETE 
                FROM tag_article TA
                WHERE TA.article_id = ?
                `;
  return db.query(_sql, [articleId]);
};

export {
  getArticleList,
  insert,
  update,
  _delete,
  getArticleById,
  addTagArticle,
  deleteTagArticleById
};
