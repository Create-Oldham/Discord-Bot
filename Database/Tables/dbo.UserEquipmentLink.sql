CREATE TABLE [dbo].[UserEquipmentLink]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[EquipmentID] [int] NOT NULL,
[AccessLevel] [int] NOT NULL
)
GO
ALTER TABLE [dbo].[UserEquipmentLink] ADD CONSTRAINT [PK_UserEquipmentLink] PRIMARY KEY CLUSTERED  ([ID], [UserID], [EquipmentID])
GO
