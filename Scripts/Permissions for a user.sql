DECLARE @discordID NVARCHAR(25) = N'';


SELECT U.DiscordID,
       U.ID AS UserID,
       E.EquipmentName,
       CASE
           WHEN UEL.AccessLevel = 1 THEN
               'Inductor'
           ELSE
               'Normal user'
       END AS LevelOfAccess
FROM dbo.UserEquipmentLink UEL
    INNER JOIN dbo.Equipment E
        ON E.ID = UEL.EquipmentID
    INNER JOIN dbo.Users U
        ON U.ID = UEL.UserID
WHERE U.DiscordID LIKE '%' + @discordID + '%';