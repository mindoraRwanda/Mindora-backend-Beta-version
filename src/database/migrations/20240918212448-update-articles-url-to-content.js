"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn("articles", "url");
    await queryInterface.addColumn("articles", "content", {
      type: Sequelize.JSONB,
      allowNull: true,
    });

    await queryInterface.sequelize.query(
      'UPDATE "articles" SET "content" = $1 WHERE "content" IS NULL;',
      {
        bind: [
          {
            sections: [
              {
                header: "Introduction",
                body: "Mental health awareness has increased significantly in the past decade...",
              },
              {
                header: "Impact of Social Media",
                body: "Platforms like Twitter and Instagram have helped raise awareness about mental health...",
              },
              {
                header: "Conclusion",
                body: "As more people discuss mental health openly, the stigma is slowly being reduced...",
              },
            ],
            references: [
              {
                title: "Mental Health and You",
                url: "https://example.com/reference1",
              },
            ],
          },
        ],
        type: queryInterface.sequelize.QueryTypes.UPDATE,
      }
    );

    await queryInterface.changeColumn("articles", "content", {
      type: Sequelize.JSONB,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("articles", "content");
    await queryInterface.addColumn("articles", "url", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
