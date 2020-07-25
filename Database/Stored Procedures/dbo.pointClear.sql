SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Upsert User details
-- ===================================================================

CREATE PROCEDURE [dbo].[pointClear]
(@DiscordID NVARCHAR(25))
AS
BEGIN
    UPDATE dbo.Users
    SET points = 0
    WHERE DiscordID = @DiscordID;

	SELECT points AS currentPoints FROM dbo.Users WHERE discordid = @DiscordID ;
END;
GO
