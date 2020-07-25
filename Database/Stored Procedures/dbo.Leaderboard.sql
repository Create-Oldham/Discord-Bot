SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Check a users points
-- ===================================================================

CREATE PROCEDURE [dbo].[Leaderboard]
AS
BEGIN

    SELECT TOP(10) points AS points, DiscordID AS userid
    FROM dbo.Users
	WHERE points > 0
	ORDER BY points DESC
END;
GO
