CREATE TABLE [dbo].[Lookup]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE Latin1_General_CI_AS NOT NULL
)
GO
ALTER TABLE [dbo].[Lookup] ADD CONSTRAINT [PK_Lookup] PRIMARY KEY CLUSTERED  ([ID])
GO
