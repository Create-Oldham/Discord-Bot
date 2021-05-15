-- this script creates a new equipment and assigns an initial inductor

-- the ID of the initial inductor
DECLARE @discordID NVARCHAR(25) = N'689230565953503350';

-- The new equipment name
DECLARE @equipmentName VARCHAR(40) = 'Server1';
-- The new equipment instructions
DECLARE @equipmentInstructions VARCHAR(250) = 'It works (maybe)';

DECLARE @userID INT;
SELECT @userID = ID
FROM dbo.Users
WHERE DiscordID = @discordID;

INSERT INTO dbo.Equipment
(
    EquipmentName,
    EquipmentInstructions
)
VALUES
(@equipmentName, @equipmentInstructions);

DECLARE @EquipmentID INT = SCOPE_IDENTITY()

INSERT INTO dbo.UserEquipmentLink
(
    UserID,
    EquipmentID,
    AccessLevel
)
VALUES
(@userID, @EquipmentID, 1);

SELECT 'The below equipment has been added and permissions to the user specified as the initial admin' AS 'System Message';

SELECT U.DiscordID,
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
WHERE U.DiscordID LIKE '%' + @discordID + '%'
      AND E.ID = @EquipmentID;

