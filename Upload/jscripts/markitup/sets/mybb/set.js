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
function markitupInsertList(extra) {
	list = '';
	do
	{
		listItem = prompt(markitup_language.enter_list_item, '');

		if(listItem != '' && listItem != null)
		{
			list = list+'[*]'+listItem+'\n';
		}
	}
	while(listItem != '' && listItem != null);
	return list = '[list'+extra+']\n'+list+'[/list]\n';
}

function markitupInsertUrl(h)
{
	selectedText = h.selection;
	url = prompt(markitup_language.enter_url, 'http://');

	if(url)
	{
		if(!selectedText)
		{
			title = prompt(markitup_language.enter_url_title, "");
		}
		else
		{
			title = selectedText;
		}

		if(title)
		{
			return '[url='+url+']'+title+'[/url]';
		}
		else
		{
			return '[url]'+url+'[/url]';
		}
	}
}

function markitupInsertEmail(h)
{
	selectedText = h.selection;
	url = prompt(markitup_language.enter_email, '');

	if(url)
	{
		if(!selectedText)
		{
			title = prompt(markitup_language.enter_email_title, "");
		}
		else
		{
			title = selectedText;
		}

		if(title)
		{
			return '[email='+url+']'+title+'[/email]';
		}
		else
		{
			return '[email]'+url+'[/email]';
		}
	}
}

mybbSettings = {
  nameSpace:          "mybbeditor", // Useful to prevent multi-instances CSS conflict
  markupSet: [
      {name:markitup_language.title_bold, key:'B', openWith:'[b]', closeWith:'[/b]'},
      {name:markitup_language.title_italic, key:'I', openWith:'[i]', closeWith:'[/i]'},
      {name:markitup_language.title_underline, key:'U', openWith:'[u]', closeWith:'[/u]'},
      {separator:'---------------' },
      {name:markitup_language.title_left, openWith:'[align=left]', closeWith:'[/align]'},
      {name:markitup_language.title_center, openWith:'[align=center]', closeWith:'[/align]'},
      {name:markitup_language.title_right, openWith:'[align=right]', closeWith:'[/align]'},
      {name:markitup_language.title_justify, openWith:'[align=justify]', closeWith:'[/align]'},
      {separator:'---------------' },
      {name:markitup_language.title_right, dropMenu :[
          {name:'Arial', className:'arial', openWith:'[font=Arial]', closeWith:'[/font]' },
          {name:'Arial Black', className:'arial_black', openWith:'[font=Arial Black]', closeWith:'[/font]' },
          {name:'Comic Sans MS', className:'comic_sans_ms', openWith:'[font=Comic Sans MS]', closeWith:'[/font]' },
          {name:'Courier New', className:'courier_new', openWith:'[font=Courier New]', closeWith:'[/font]' },
          {name:'Georgia', className:'georgia', openWith:'[font=Georgia]', closeWith:'[/font]' },
          {name:'Impact', className:'impact', openWith:'[font=Impact]', closeWith:'[/font]' },
          {name:'Sans-serif', className:'sans_serif', openWith:'[font=Sans-serif]', closeWith:'[/font]' },
          {name:'Serif', className:'serif', openWith:'[font=Serif]', closeWith:'[/font]' },
          {name:'Times New Roman', className:'times_new_roman', openWith:'[font=Times New Roman]', closeWith:'[/font]' },
          {name:'Trebuchet MS', className:'trebuchet_ms', openWith:'[font=Trebuchet MS]', closeWith:'[/font]' },
          {name:'Verdana', className:'verdana', openWith:'[font=Verdana]', closeWith:'[/font]' }
      ]},
      {name:markitup_language.size, key:'S', openWith:'[size=[!['+markitup_language.size+']!]]', closeWith:'[/size]', dropMenu :[
          {name:markitup_language.size_xx_small, className:'size1', openWith:'[size=xx-small]', closeWith:'[/size]' },
          {name:markitup_language.size_x_small, className:'size2', openWith:'[size=x-small]', closeWith:'[/size]' },
          {name:markitup_language.size_small, className:'size3', openWith:'[size=small]', closeWith:'[/size]' },
          {name:markitup_language.size_medium, className:'size4', openWith:'[size=medium]', closeWith:'[/size]' },
          {name:markitup_language.size_large, className:'size5', openWith:'[size=large]', closeWith:'[/size]' },
          {name:markitup_language.size_x_large, className:'size6', openWith:'[size=x-large]', closeWith:'[/size]' },
          {name:markitup_language.size_xx_large, className:'size7', openWith:'[size=xx-large]', closeWith:'[/size]' }
      ]},
      {name:markitup_language.color, openWith:'[color=[!['+markitup_language.color+']!]]', closeWith:'[/color]', dropMenu: [
          {name:'', openWith:'[color=yellow]', closeWith:'[/color]', className:"col1-1" },
          {name:'', openWith:'[color=orange]', closeWith:'[/color]', className:"col1-2" },
          {name:'', openWith:'[color=red]', closeWith:'[/color]', className:"col1-3" },
          {name:'', openWith:'[color=blue]', closeWith:'[/color]', className:"col2-1" },
          {name:'', openWith:'[color=purple]', closeWith:'[/color]', className:"col2-2" },
          {name:'', openWith:'[color=green]', closeWith:'[/color]', className:"col2-3" },
          {name:'', openWith:'[color=white]', closeWith:'[/color]', className:"col3-1" },
          {name:'', openWith:'[color=gray]', closeWith:'[/color]', className:"col3-2" },
          {name:'', openWith:'[color=black]', closeWith:'[/color]', className:"col3-3" }
      ]},
      {separator:'---------------' },
      {name:markitup_language.title_image, replaceWith:'[img][!['+markitup_language.enter_image+':!:http://]!][/img]'},
      {name:markitup_language.title_email, replaceWith: function(h){return markitupInsertEmail(h)}},
      {name:markitup_language.title_hyperlink, replaceWith: function(h){return markitupInsertUrl(h)}},
      {name:'', dropMenu :[
          {name:markitup_language.video_dailymotion, openWith:'[video=dailymotion][!['+markitup_language.enter_video_url+':!:http://]!][/video]' },
          {name:markitup_language.video_facebook, openWith:'[video=facebook][!['+markitup_language.enter_video_url+':!:http://]!][/video]' },
          {name:markitup_language.video_liveleak, openWith:'[video=liveleak][!['+markitup_language.enter_video_url+':!:http://]!][/video]' },
          {name:markitup_language.video_metacafe, openWith:'[video=metacafe][!['+markitup_language.enter_video_url+'!:http://]!][/video]' },
          {name:markitup_language.video_veoh, openWith:'[video=veoh][!['+markitup_language.enter_video_url+':!:http://]!][/video]' },
          {name:markitup_language.video_vimeo, openWith:'[video=vimeo][!['+markitup_language.enter_video_url+':!:http://]!][/video]' },
          {name:markitup_language.video_youtube, openWith:'[video=youtube][!['+markitup_language.enter_video_url+':!:http://]!][/video]' },
      ]},
      {separator:'---------------' },
      {name:markitup_language.title_bulletlist, replaceWith: function(){return markitupInsertList('')}},
      {name:markitup_language.title_numlist, replaceWith: function(){return markitupInsertList('=1')}},
      {separator:'---------------' },
      {name:markitup_language.title_code, openWith:'[code]', closeWith:'[/code]'},
      {name:markitup_language.title_php, openWith:'[php]', closeWith:'[/php]'},
      {name:markitup_language.title_quote, openWith:'[quote]', closeWith:'[/quote]'}
   ]
}