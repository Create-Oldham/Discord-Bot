CREATE TABLE [dbo].[Users]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[DiscordID] [nvarchar] (25) COLLATE Latin1_General_CI_AS NOT NULL,
[Admin] [tinyint] NULL
)
GO
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED  ([ID])
GO
