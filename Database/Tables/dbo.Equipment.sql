CREATE TABLE [dbo].[Equipment]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EquipmentName] [nvarchar] (40) COLLATE Latin1_General_CI_AS NOT NULL,
[EquipmentInstructions] [nvarchar] (250) COLLATE Latin1_General_CI_AS NULL
)
GO
ALTER TABLE [dbo].[Equipment] ADD CONSTRAINT [PK_Equipment] PRIMARY KEY CLUSTERED  ([ID])
GO
