<?php
/**
 * This file is part of markItUp! for MyBB.
 * Copyright (C) 2015 StefanT (https://www.mybb.de)
 * https://github.com/Stefan-ST/MyBB-Markitup
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

if(!defined('IN_MYBB'))
{
	die('This file cannot be accessed directly.');
}

if(defined('THIS_SCRIPT'))
{
    global $templatelist;

    if(isset($templatelist))
    {
        $templatelist .= ',';
    }

	if(THIS_SCRIPT == 'calender.php' || THIS_SCRIPT == 'editpost.php' || THIS_SCRIPT == 'modcp.php' || THIS_SCRIPT == 'newreply.php' || THIS_SCRIPT == 'newthread.php' || THIS_SCRIPT == 'private.php' || THIS_SCRIPT == 'usercp.php' || THIS_SCRIPT == 'warnings.php')
	{
		$templatelist .= 'markitup';
	}
}

$plugins->add_hook('calendar_addevent_end', 'markitup_run');
$plugins->add_hook('calendar_editevent_end', 'markitup_run');
$plugins->add_hook('editpost_end', 'markitup_run');
$plugins->add_hook('modcp_edit_announcement', 'markitup_run');
$plugins->add_hook('modcp_editprofile_end', 'markitup_run_signature');
$plugins->add_hook('modcp_new_announcement', 'markitup_run');
$plugins->add_hook('newreply_end', 'markitup_run');
$plugins->add_hook('newthread_end', 'markitup_run');
$plugins->add_hook('private_send_end', 'markitup_run');
$plugins->add_hook('usercp_editsig_end', 'markitup_run_signature');
$plugins->add_hook('warnings_warn_end', 'markitup_run');

function markitup_info()
{
	global $lang;
	$lang->load('hello');

	return array(
		'name'			=> 'markItUp! Editor',
		'description'	=> 'markItUp! Editor ersetzt den SCEditor durch einen simplen MyCode-Editor',
		'website'		=> 'https://www.mybb.de',
		'author'		=> 'StefanT',
		'authorsite'	=> 'https://www.mybb.de',
		'version'		=> '1.1',
		'compatibility'	=> '18*',
		'codename'		=> 'markitup'
	);
}

function markitup_activate()
{
	global $db;

	$db->delete_query('templates', "title='markitup'");
	$template = array(
		'title' => 'markitup',
		'template' => $db->escape_string('<link rel="stylesheet" href="{$mybb->asset_url}/jscripts/markitup/skins/simple/style.css" type="text/css" />
<link rel="stylesheet" href="{$mybb->asset_url}/jscripts/markitup/sets/mybb/style.css" type="text/css" />
<script type="text/javascript">
{$markitup_language}
</script>
<script type="text/javascript" src="{$mybb->asset_url}/jscripts/markitup/jquery.markitup.js"></script>
<script type="text/javascript" src="{$mybb->asset_url}/jscripts/markitup/sets/mybb/set.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$("#{$bind}").markItUp(mybbSettings);
});
var markitup_instance = \'#{$bind}\';
</script>'),
		'version' => 1,
		'sid' => -1,
		'dateline' => TIME_NOW
	);
	$db->insert_query('templates', $template);

	require_once MYBB_ROOT.'inc/adminfunctions_templates.php';

	find_replace_templatesets('smilie', '#'.preg_quote('{$onclick}').'#', ' onclick="$.markItUp({target:markitup_instance,replaceWith:\'{$find}{$smilie_insert}\'});$.modal.close()"');
	find_replace_templatesets('post_attachments_attachment_postinsert', '#'.preg_quote('$(\'#message\').sceditor(\'instance\').insertText(\'[attachment={$attachment[\'aid\']}]\');', '#').'#', '$.markItUp({replaceWith:\'[attachment={$attachment[\'aid\']}]\'});');
}

function markitup_deactivate()
{
	global $db;

	$db->delete_query('templates', "title='markitup'");

	require_once MYBB_ROOT.'inc/adminfunctions_templates.php';
	
	find_replace_templatesets('smilie', '#'.preg_quote(' onclick="$.markItUp({target:markitup_instance,replaceWith:\'{$find}{$smilie_insert}\'});$.modal.close()"').'#', '{$onclick}');
	find_replace_templatesets('post_attachments_attachment_postinsert', '#'.preg_quote('$.markItUp({replaceWith:\'[attachment={$attachment[\'aid\']}]\'});').'#', '$(\'#message\').sceditor(\'instance\').insertText(\'[attachment={$attachment[\'aid\']}]\');');
}

function markitup_run()
{
	markitup_run_build('message');
}
function markitup_run_signature()
{
	markitup_run_build('signature');
}
function markitup_run_build($bind='message')
{
	global $mybb, $codebuttons, $templates, $lang;
	
	if($codebuttons)
	{
		$lang->load('markitup');
		$editor_lang_strings = array(
			"editor_title_bold",
			"editor_title_italic",
			"editor_title_underline",
			"editor_title_left",
			"editor_title_center",
			"editor_title_right",
			"editor_title_justify",
			"editor_title_numlist",
			"editor_title_bulletlist",
			"editor_title_image",
			"editor_title_hyperlink",
			"editor_title_email",
			"editor_title_quote",
			"editor_title_code",
			"editor_title_php",
			"editor_enter_list_item",
			"editor_enter_url",
			"editor_enter_url_title",
			"editor_enter_email",
			"editor_enter_email_title",
			"editor_enter_image",
			"editor_enter_video_url",
			"editor_video_dailymotion",
			"editor_video_facebook",
			"editor_video_liveleak",
			"editor_video_metacafe",
			"editor_video_veoh",
			"editor_video_vimeo",
			"editor_video_yahoo",
			"editor_video_youtube",
			"editor_size_xx_small",
			"editor_size_x_small",
			"editor_size_small",
			"editor_size_medium",
			"editor_size_large",
			"editor_size_x_large",
			"editor_size_xx_large",
			"editor_font",
			"editor_size",
			"editor_color"
		);
		$markitup_language = "var markitup_language = {\n";
		foreach($editor_lang_strings as $key => $lang_string)
		{
			// Strip initial editor_ off language string if it exists - ensure case sensitivity does not matter.
			$js_lang_string = preg_replace("#^editor_#i", "", $lang_string);
			$string = str_replace("\"", "\\\"", $lang->$lang_string);
			$markitup_language .= "\t{$js_lang_string}: \"{$string}\"";

			if(isset($editor_lang_strings[$key+1]))
			{
				$markitup_language .= ",";
			}

			$markitup_language .= "\n";
		}
		$markitup_language .= "};";
		eval("\$codebuttons = \"".$templates->get("markitup")."\";");
	}
}
